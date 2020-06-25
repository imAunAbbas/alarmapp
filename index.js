/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {InAppNotificationProvider} from 'react-native-in-app-notification';

const AppWithNotifications = () => {
  return (
    <InAppNotificationProvider>
      <App />
    </InAppNotificationProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWithNotifications);
