import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

const TimerScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#4B416B" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => console.log('time stop pressed...')}>
          <Text>Stop Timer</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TimerScreen;
