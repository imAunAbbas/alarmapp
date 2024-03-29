import React, {useEffect} from 'react';
import {View, Text, StatusBar, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const StartScreen = (props) => {
  useEffect(() => {
    setTimeout(nav, 3500);
  });

  /* handle "useEffect()" to move to next screen,
i.e. main screen after certain ammount of time */

  const nav = async () => {
    try {
      const value = await AsyncStorage.getItem('@timer');
      if (value !== null) {
        // value previously stored
        props.navigation.replace('Timer');
      } else {
        props.navigation.replace('Input');
      }
    } catch (e) {
      Alert.alert('Error', e.toString());
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#008786" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#008786" />
        <Text
          style={{
            color: '#008786',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          Starting Countdown Timer App..
        </Text>
      </View>
    </>
  );
};

export default StartScreen;
