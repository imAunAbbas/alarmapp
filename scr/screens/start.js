import React, {useEffect} from 'react';
import {View, Text, StatusBar, ActivityIndicator, Platform} from 'react-native';

const StartScreen = (props) => {
  //   useEffect(() => {
  //     setTimeout(3500);
  //   });

  /* handle "useEffect()" to move to next screen,
i.e. main screen after certain ammount of time */

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#4B416B" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#4B416B" />
        <Text style={{color: '#4B416B', fontSize: 18, marginTop: 10}}>
          Loading Timer App...
        </Text>
      </View>
    </>
  );
};

export default StartScreen;
