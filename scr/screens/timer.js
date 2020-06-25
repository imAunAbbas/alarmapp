import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';

const TimerScreen = (props) => {
  // const [current, setCurrent] = useState();
  // const [value, setValue] = useState(0);
  const [time, setTime] = useState(10);
  // const [sec, setSec] = useState(0);
  // const [min, setMin] = useState(0);
  // const [hour, setHour] = useState(0);

  useEffect(() => {
    const interval = setInterval(timerValue, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerValue = async () => {
    try {
      const current = Date.parse(Date());
      const value = await AsyncStorage.getItem('@timer');
      if (value !== null) {
        const temp = Number(value);
        if (temp > current) {
          setTime((temp - current) / 1000); // only 1st statement executing
          // convertHMS();
        } else if (temp == current) {
          setTime(0);
          // Alert.alert('Time up', 'timer is over');
          // generate notification here.
        } else if (temp < current) {
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
          timeToShow={['D', 'H', 'M', 'S']}
          timeLabels={{d: 'DD', h: 'HH', m: 'MM', s: 'SS'}}
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
