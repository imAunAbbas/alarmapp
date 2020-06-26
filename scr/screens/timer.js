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

const TimerScreen = (props) => {
  // const [current, setCurrent] = useState();
  // const [value, setValue] = useState(0);
  const [time, setTime] = useState(0);

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
          setTime((temp - current) / 1000);
        } else if (temp == current) {
          setTime(0);
          notify();
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

  const notify = () => {
    Alert.alert('Time Up', 'Your countdown time is over');
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
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.view}>
            <Text style={styles.text}>{Math.floor(time / 3600)}</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
            {' '}
            :{' '}
          </Text>
          <View style={styles.view}>
            <Text style={styles.text}>{Math.floor((time % 3600) / 60)}</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
            {' '}
            :{' '}
          </Text>
          <View style={styles.view}>
            <Text style={styles.text}>{Math.floor((time % 3600) % 60)}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.view2}>
            <Text style={styles.text}>HH</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
            {'   '}
          </Text>
          <View style={styles.view2}>
            <Text style={styles.text}>MM</Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
            {'   '}
          </Text>
          <View style={styles.view2}>
            <Text style={styles.text}>SS</Text>
          </View>
        </View>
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
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#008786',
    borderRadius: 5,
    borderWidth: 2,
  },
  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    borderColor: '#008786',
  },
  text: {
    color: '#008786',
    fontSize: 18,
    fontWeight: 'bold',
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
