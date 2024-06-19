/* eslint-disable prettier/prettier */
import { View, Text, ToastAndroid, TouchableOpacity, PermissionsAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import React, { useState, useEffect } from 'react'
import QRCode from 'react-native-qrcode-svg'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNFS from "react-native-fs"
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

export default function Generater({ route }) {


  useEffect(() => {
    request_storage_runtime_permission()
  }, [])

  const request_storage_runtime_permission = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'ReactNativeCode Storage Permission',
          'message': 'ReactNativeCode App needs access to your storage to download Photos.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        showMessage({
          message: "Storage Permission Granted.",
          type: "success",
        })
      }
      else {
        showMessage({
          message: "Storage Permission Not Granted",
          type: "danger",
        })
      }
    } catch (err) {
      console.warn(err)
    }
  }



  const navigation = useNavigation();
  const { orderId } = route.params;
  const [state, setState] = useState(orderId);
  let svg = ''

  function saveQrToDisk() {
    svg.toDataURL((data) => {
      RNFS.writeFile(RNFS.CachesDirectoryPath + "/some-name.png", data, 'base64')
        .then((success) => {
          showMessage({
            message: "QR Code Saved to Gallery",
            type: "success",
          });
          return CameraRoll.save(RNFS.CachesDirectoryPath + "/some-name.png", 'photo')
        })
        .then(() => {
          this.setState({ busy: false, imageSaved: true })
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
        })
    })
  }

  return (
    <>
      <View style={{ backgroundColor: "#26de81", height: 70 }}>
        <Feather name="chevron-left" size={30} style={{ marginTop: 20, fontWeight: "500", marginLeft: 10 }} color="#fff" onPress={() => navigation.goBack()} />
      </View>
      <View style={{ flexDirection: "column", alignContent: "center", justifyContent: "center", marginTop: 100 }}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <QRCode
            value={state}
            size={200}
            bgColor='black'
            fgColor='white'
            getRef={(ref) => (svg = ref)}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ marginTop: 50, backgroundColor: "#26de81", width: 100, flexDirection: "row", width: 150, borderRadius: 50 }}>

            <TouchableOpacity onPress={() => saveQrToDisk()}>
              <View style={{ flexDirection: "row", }}>
                <Text style={{ padding: 15, fontWeight: "600", fontSize: 17, color: "#fff" }}>Download</Text>
                <AntDesign name="qrcode" size={25} color="#fff" style={{ marginTop: 15 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}
