import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CountDown from 'react-native-countdown-component';
/* This library's seperator and running props are not working */

const TimerScreen = (props) => {
  const [run, setRun] = useState(true);

  const handleTimer = () => {
    console.log('Pause is pressed');
    setRun(false);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#008786" />
      <View style={styles.header}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
          Countdown Timer
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            margin: 10,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#008786',
          }}>
          Countdown Timer is running
        </Text>
        <CountDown
          until={60 * 10 + 10}
          size={30}
          onFinish={() => alert('Finished')}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: '#008786',
          }}
          digitTxtStyle={{color: '#008786'}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{h: 'HH', m: 'MM', s: 'SS'}}
          timeLabelStyle={{color: '#008786', fontWeight: 'bold'}}
          runnig={run} // not pausing the timer
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handleTimer}>
            <Text style={{color: '#fff', fontSize: 16}}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={() => console.log('Delete is pressed')}>
            <Text style={{color: '#fff', fontSize: 16}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: Platform.OS === 'android' ? 70 : 90,
    paddingTop: Platform.OS === 'android' ? 5 : 36,
    backgroundColor: '#008786',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 30,
    marginTop: 15,
    width: 60,
    height: 35,
    backgroundColor: '#008786',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimerScreen;
