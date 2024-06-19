/* eslint-disable prettier/prettier */
import { StyleSheet, Text, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useMutation } from '@apollo/client';
import { MUTATION_UPDATE_BARCODE_NO } from '../GraphQlOperation/Mutation';
import { QUERY_GET_ORDER_BY_ID } from '../GraphQlOperation/Query';

export default function ScannerQR({ route }) {

  const { orderId } = route.params;
  console.log("orderId", orderId)
  const [getid, setGetid] = useState();
  const navigation = useNavigation();

  const [updateBarcodeNo] = useMutation(MUTATION_UPDATE_BARCODE_NO, {
    refetchQueries: [
      QUERY_GET_ORDER_BY_ID
    ]
  });

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Speeasyy App Camera Permission',
          message: 'Speeasyy App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        showMessage({
          message: 'You can use the camera.',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Camera permission denied.',
          type: 'danger',
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();
  const [goNext, setGoNext] = useState(false);

  const startScan = () => {
    setScan(true);
    setResult;
  };

  const onSuccess = e => {

    console.log('e', e.data);
    setResult(e.data);

    updateBarcodeNo({
      variables: {
        "orderId": `${orderId}`,
        "barcodeNo": `${e.data}`
      },
    });

    showMessage({
      message: 'Order assigned to barcode successfully.',
      type: 'success',
    });

    setGoNext(true);
  };

  if (goNext) {
    // navigation.navigate('Result', ({ orderId: result }));
    navigation.navigate('MainHomeScreen');
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>Scan Barcode</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    marginTop: 20,
    fontSize: 21,
    color: 'rgb(0,122,255)',
    backgroundColor: '#50E687',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
  },
  buttonTouchable: {
    padding: 16,
  },

});