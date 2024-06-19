/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, gql } from '@apollo/client';
import { showMessage } from "react-native-flash-message";
export const AuthContext = createContext();

import PushNotification, { Importance } from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const MUTATION_LOGIN_DELIVERY_BOY = gql`
mutation Mutation($deliveryboyloginInput: deliveryboyloginInput) {
  deliveryboylogin(DeliveryboyloginInput: $deliveryboyloginInput) {
    deliveryToken
    userId
  }
}  
`;

export const AuthProvider = ({ children }) => {

  const [deliveryBoyId, setDeliveryBoyId] = useState();

  useEffect(() => {
    AsyncStorage.getItem('deliveryId').then(id => setDeliveryBoyId(id));
  }, []);

  const [loginError, setLoginError] = useState(false);
  const [breakIf, setBreakIf] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState();
  const [emptyError, setEmptyError] = useState(false);


  const [deliveryboylogin, { data: loginData, loading: loginLoading }] = useMutation(MUTATION_LOGIN_DELIVERY_BOY, {
    onError(error) {
      setLoginError(true)
    }
  });


  const login = (userName, password) => {
    setLoginError(false);
    setEmptyError(false);
    setBreakIf(true)
    if (userName === '' || password === '') {
      setEmptyError(true)
    }
    else {
      deliveryboylogin({
        variables: {
          "deliveryboyloginInput": {
            "userName": `${userName}`,
            "password": `${password}`
          }
        }
      });
    }
  };

  if (loginError) {
    showMessage({
      message: "Username & Password not match!!!",
      type: "danger",
    });
  }
  if (emptyError) {
    showMessage({
      message: "Fill all fields!!!",
      type: "danger",
    });
  }

  const logOut = async () => {
    setDeliveryInfo();
    await AsyncStorage.removeItem('deliveryToken');
    await AsyncStorage.removeItem('deliveryId');
    await AsyncStorage.removeItem('deliveryBoyDeviceToken');
  }

  if (loginData && breakIf) {
    AsyncStorage.setItem("deliveryToken", loginData.deliveryboylogin.deliveryToken);
    AsyncStorage.setItem("deliveryId", loginData.deliveryboylogin.userId);
    setDeliveryInfo(loginData.deliveryboylogin.deliveryToken);
    setBreakIf(false);
  }


  const isLoggedIn = async () => {
    try {

      let deliveryInfo = await AsyncStorage.getItem('deliveryToken');

      if (deliveryInfo) {
        setDeliveryInfo(deliveryInfo)
        console.log(deliveryInfo)
      }

    } catch (e) {
      console.log(e)
    }
  };

  const createChannel = (channelId) => {
    PushNotification.createChannel(
      {
        channelId: channelId, // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        priority: 'high',
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  const showNotification = (channelId, title, message, options) => {
    PushNotification.localNotification({
      channelId: channelId,
      title: title,
      message: message,
      vibrate: true,
      priority: 'high',
      importance: Importance.HIGH,
    });
  }

  useEffect(() => {
    messaging().getToken(firebase.app().options.messagingSenderId).then((token) => {
      console.log('token', token);
      AsyncStorage.setItem("deliveryBoyDeviceToken", token);
    });

    const unsubscribe = messaging().onMessage(async remoteMsg => {
      const channelId = Math.random().toString(36).substring(7);
      createChannel(channelId);
      showNotification(channelId, remoteMsg.notification.title, remoteMsg.notification.body);
      console.log('remoteMsg', remoteMsg);
    });

    messaging().setBackgroundMessageHandler(async remoteMsg => {
      console.log('remote background', remoteMsg)
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    isLoggedIn();
  }, []);





  return (

    <AuthContext.Provider value={{
      login,
      deliveryInfo,
      logOut,
      loginLoading,
    }}>
      {children}
    </AuthContext.Provider>


  )
}