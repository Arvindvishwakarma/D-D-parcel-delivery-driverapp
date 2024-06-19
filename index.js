/* eslint-disable prettier/prettier */
import PushNotification from "react-native-push-notification";
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

PushNotification.configure({

  onRegister: function (token) {
    console.log("token", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData)
  },

  onAction: function (notification) {
    console.log("ACTION", notification.action);
    console.log("NOTIFICATION", notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
