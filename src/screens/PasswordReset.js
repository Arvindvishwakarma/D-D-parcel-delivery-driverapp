/* eslint-disable radix */
/* eslint-disable quotes */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { Button, Badge, Card, } from 'react-native-paper';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEND_OTP } from '../GraphQlOperation/Query';
import RBSheet from "react-native-raw-bottom-sheet";
import { showMessage, hideMessage } from "react-native-flash-message";
import { MUTATION_CHECK_CONTACT } from '../GraphQlOperation/Mutation';

export default function PasswordReset({ navigation }) {

  const [contact, setContact] = useState('');
  const [verify, setVerify] = useState('');
  const [sendOtp] = useLazyQuery(SEND_OTP);
  const [error, setError] = useState();
  const [getOtp, setGetOtp] = useState();
  const [stop, setStop] = useState(false);

  const [checkContact, { data }] = useMutation(MUTATION_CHECK_CONTACT, {
    onError(error) {
      setError(true)
    }
  });

  const refRBSheet = useRef();

  const handleClick = () => {
    setStop(false)
    const otp = Math.floor(1000 + Math.random() * 9000);
    sendOtp({
      variables: {
        "contact": `${contact}`,
        "otp": `${otp}`
      }
    })
    setGetOtp(otp)
    refRBSheet.current.open();

  }

  if (stop) {
    if (data) {
      navigation.navigate("ResetPassword", contact);
    }
    else {
      showMessage({
        message: "Contact Not Exist!!!",
        type: "warning",
      });
    }
  }

  console.log("data", data)
  console.log("OTP", getOtp)

  const handleVerif = () => {
    if (parseInt(getOtp) === parseInt(verify)) {
      checkContact({
        variables: {
          "contact": `${contact}`
        }
      })
      setStop(true)
    } else {
      alert('Invalid OTP!!!')
    }
  }


  return (
    <View>
      <View style={{ marginTop: 200, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Card style={{ width: "90%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#26de81", fontSize: 15, margin: 20 }}>Enter Contact Number For OTP !!</Text>
          </View>
          <View style={{ borderWidth: 2, borderColor: "#26de81", margin: 10, borderRadius: 10 }}>
            <TextInput placeholder='Enter here...' style={{ fontSize: 17 }} onChangeText={(e) => { setContact(e); setStop(false) }} />
          </View>
          <TouchableOpacity onPress={() => handleClick()}>
            <View style={{ backgroundColor: "#26de81", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ padding: 10, color: "#fff", fontWeight: "bold" }}>Send OTP</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: { backgroundColor: "transparent" },
          draggableIcon: { backgroundColor: "#000" }
        }}
      >
        <View style={{ borderWidth: 2, borderColor: "#26de81", margin: 10, borderRadius: 10 }}>
          <TextInput placeholder='Enter OTP...' style={{ fontSize: 17 }} onChangeText={(e) => setVerify(e)} />
        </View>
        <TouchableOpacity onPress={() => handleVerif()}>
          <View style={{ backgroundColor: "#26de81", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: 10 }}>
            <Text style={{ padding: 10, color: "#fff", fontWeight: "bold" }}>Verify OTP</Text>
          </View>
        </TouchableOpacity>

      </RBSheet>
    </View>
  )
}
