/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreennew from '../screens/LoginScreennew';
import MainHomeScreen from '../screens/MainHomeScreen';
import AssignedOrderCardScreen from '../OrderOptionsScreens/AssignedOrderCardScreen';
import TabNavigator from './TabNavigator';
import MainOrderViewScreen from '../OrderOptionsScreens/MainOrderViewScreen';
import OrderdetailScreen from '../OrderOptionsScreens/OrderdetailScreen';
import ScannerQR from '../screens/ScannerQR';
import ProfileScreen from '../screens/ProfileScreen';
import Generater from '../screens/Generater';
import Result from '../screens/Result';
import { AuthContext } from '../context/AuthContext';
import ScannerAll from '../screens/ScannerAll';
import ResultAll from '../screens/ResultAll';
import OptimizedOrder from '../OrderOptionsScreens/OptimizedOrder';
import PasswordReset from '../screens/PasswordReset';
import ResetPassword from '../screens/ResetPassword';


const Stack = createNativeStackNavigator();

const AuthStack = () => {

  const { deliveryInfo } = useContext(AuthContext)


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        deliveryInfo ?
          <>
            <Stack.Screen component={MainHomeScreen} name='MainHomeScreen' />
            <Stack.Screen component={TabNavigator} name='TabNavigator' />
            <Stack.Screen component={AssignedOrderCardScreen} name="AssignedOrderCardScreen" />
            <Stack.Screen component={MainOrderViewScreen} name="MainOrderViewScreen" />
            <Stack.Screen component={OrderdetailScreen} name="OrderdetailScreen" />
            <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
            <Stack.Screen component={ScannerQR} name="ScannerQR" />
            <Stack.Screen component={Generater} name="Generater" />
            <Stack.Screen component={Result} name="Result" />
            <Stack.Screen component={ScannerAll} name="ScannerAll" />
            <Stack.Screen component={ResultAll} name="ResultAll" />
            <Stack.Screen component={OptimizedOrder} name="OptimizedOrder" />
          </>
          :
          <>
            <Stack.Screen component={LoginScreennew} name='LoginScreennew' />
            <Stack.Screen component={PasswordReset} name="PasswordReset" />
            <Stack.Screen component={ResetPassword} name="ResetPassword" />
          </>


      }

    </Stack.Navigator>
  )
}


export default AuthStack;