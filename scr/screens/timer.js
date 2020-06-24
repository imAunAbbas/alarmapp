import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';
/* This library's seperator and running props are not working */

const TimerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log('in useEffect');
    timerValue();
    setLoading(false);
  }, [loading]);

  const timerValue = async () => {
    const current = Date.parse(Date());
    try {
      const value = await AsyncStorage.getItem('@timer');
      if (value !== null) {
        console.log(value); // <-- log
        const temp = Number(value);
        if (temp > current) {
          setTime((temp - current) / 1000);
          // show the countdown time
        } else if (temp == current) {
          setTime(0);
          // generate notification.
        } else if (temp < current) {
          // delete async storage value.
          deleteTimer();
          props.navigation.replace('Input');
        }
      } else {
        props.navigation.replace('Input');
      }
    } catch (e) {
      Alert.alert('Error', e.toString());
    }
  };

  const deleteTimer = async () => {
    try {
      await AsyncStorage.removeItem('@timer');
    } catch (e) {
      Alert.alert('Error', e.toString());
    }
    setTime(0);
    props.navigation.replace('Input');
  };

  if (loading) {
    return (
      <>
        {console.log('in loading')}
        <StatusBar barStyle="light-content" backgroundColor="#008786" />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
          }}>
          <ActivityIndicator size="large" color="#008786" />
          <Text style={{color: '#008786', fontSize: 16, marginTop: 10}}>
            Please wait...
          </Text>
        </View>
      </>
    );
  }

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
          until={time} // <-- Time in seconds
          size={30}
          onFinish={() => Alert.alert('Finished', 'Countdown Time is finished')}
          digitStyle={{
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#008786',
          }}
          digitTxtStyle={{color: '#008786'}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{h: 'HH', m: 'MM', s: 'SS'}}
          timeLabelStyle={{color: '#008786', fontWeight: 'bold'}}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={deleteTimer}>
          <Text style={{color: '#fff', fontSize: 16}}>Delete</Text>
        </TouchableOpacity>
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
