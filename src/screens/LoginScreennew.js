/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../context/AuthContext';
import PushNotification from 'react-native-push-notification';
// import BackgroundTask from 'react-native-background-task';

import { useSubscription, useMutation, gql } from '@apollo/client';

const SUBSCRIPTION_USER = gql`
        subscription Subscription {
        newTestUser {
            id
            name
            age
        }
    }`


const THEME_COLOR = '#E5E5E5';
const LoginScreennew = ({ navigation }) => {
  const { login, loginLoading } = useContext(AuthContext);

  useEffect(() => {
    createChannels();
  })

  // BackgroundTask.define(() => {
  //   alert('okk')
  //   console.log('Hello from a background task')
  //   // BackgroundTask.finish()
  // })

  const { data, loading } = useSubscription(SUBSCRIPTION_USER, {
    onSubscriptionData: (data) => {
      console.log(data.subscriptionData.data)
      PushNotification.cancelAllLocalNotifications();
      PushNotification.localNotification({
        channelId: "test-channel",
        title: "You clicked",
        message: "OK",
      });
    }
  });

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test-channel",
        channelName: "Test Channel"
      }
    )
  }

  const handleNotification = () => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: "test-channel",
      title: "You clicked",
      message: "OK",
    });

    PushNotification.localNotificationSchedule({
      channelId: "test-channel",
      title: "Alarm",
      message: "5 sec",
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: true
    })
  }
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.container}>

        <View style={styles.header}>
          <Animatable.Image animation="bounceIn" source={require('../assets/images/LoginPageimg.png')} style={styles.logo} resizeMode="stretch" />
          {/*  */}
        </View>
        <Animatable.View style={styles.footer}
          animation="fadeInUpBig">
          <Text style={styles.title}>
            Login
          </Text>
          <Text style={styles.text}>
            Let's get started! Enter your details
          </Text>
          <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 30, marginHorizontal: 20 }}>
            <TextInput style={{ paddingLeft: 20, width: 290, color:'#000' }} placeholder="Username" onChangeText={(e) => setUserName(e)} placeholderTextColor="#bdc3c7"/>
          </View>
          <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 30, marginHorizontal: 20 }}>
            <TextInput style={{ paddingLeft: 20, width: 290, color:'#000' }} placeholder="Password" onChangeText={(e) => setPassword(e)} placeholderTextColor="#bdc3c7"/>
          </View>

          <View style={styles.button}>
            {
              loginLoading ?
                <ActivityIndicator color="#000" size="large" /> :
                <TouchableOpacity onPress={() => login(userName, password)}>
                  <LinearGradient colors={['#50E687', '#50E687']} style={styles.signIn}>
                    <Text style={styles.textSign}>
                      Log In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
            }
          </View>
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10}}>
          <TouchableOpacity onPress={()=>navigation.navigate('PasswordReset')}>
            <Text style={{color:'#bdc3c7'}}>Forgot Password</Text>
          </TouchableOpacity>
          </View>



          {/* <View style={styles.button}>
            <TouchableOpacity onPress={() => handleNotification()}>
              <LinearGradient colors={['#50E687', '#50E687']} style={styles.signIn}>
                <Text style={styles.textSign}>
                  Log In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}
        </Animatable.View>

        <View style={{ backgroundColor: "#fff" }}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'black', fontSize: 10, fontWeight: '600' }}>Version 1.0.0
            </Text>

          </View>
          {/* <TouchableOpacity >
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: '600' }}>Terms & Conditions
              </Text>

            </View>
          </TouchableOpacity> */}

        </View>
      </View>
    </>

  )
}
/* Rectangle 15 */


export default LoginScreennew;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.21;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5"

  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5'
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo * 1.7,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    color: 'black',
    marginTop: 7,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    marginTop: 30
  },
  button2: {
    alignItems: 'center',
    marginTop: 10, marginBottom: 30
  },
  signIn: {
    width: 250,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  signIn2: {
    width: 200,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  textSign2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  image: {
    width: 414,
    height: 1301,
    position: 'absolute'

  },
});