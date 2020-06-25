import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const InputScreen = (props) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const hoursInputHandler = (inputText) => {
    setHours(inputText.replace(/[^0-9]/g, ''));
  };

  const minutesInputHandler = (inputText) => {
    setMinutes(inputText.replace(/[^0-9]/g, ''));
    // const temp = parseInt(minutes);
  };

  const secondsInputHandler = (inputText) => {
    setSeconds(inputText.replace(/[^0-9]/g, ''));
  };

  const resetTimer = () => {
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  const startTimer = () => {
    const hour = Number(hours);
    const min = Number(minutes);
    const sec = Number(seconds);

    /* Here, "parseInt()" is not working. It returns NaN.
    So used "Number()" instead to convert string to number. */

    if (!hour && !min && !sec) {
      Alert.alert('Empty', 'Please enter time values first');
      return;
    }

    if (min > 59 || sec > 59) {
      Alert.alert(
        'Invalid input',
        'Minutes and seconds can not be greater than 59',
      );
      return;
    }
    Keyboard.dismiss();
    const timer = hour * 3600000 + min * 60000 + sec * 1000;
    saveTimer(timer);
    setHours('');
    setMinutes('');
    setSeconds('');
    props.navigation.navigate('Timer');
  };

  /* "AsyncStorage" saves the values in the form of strings.
    So always convert values to string before saving into it. */

  const saveTimer = async (timer) => {
    const date = Date.parse(Date());
    const val = timer + date;
    try {
      await AsyncStorage.setItem('@timer', val.toString());
    } catch (e) {
      Alert.alert('Error', e.toString());
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#008786" />
      <View style={styles.header}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
          Set Countdown
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
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
            Input time to start countdown
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.input}
              blurOnSubmit
              placeholder="HH"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={hoursInputHandler}
              value={hours}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
              {' '}
              :{' '}
            </Text>
            <TextInput
              style={styles.input}
              blurOnSubmit
              placeholder="MM"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={minutesInputHandler}
              value={minutes}
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
              {' '}
              :{' '}
            </Text>
            <TextInput
              style={styles.input}
              blurOnSubmit
              placeholder="SS"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={secondsInputHandler}
              value={seconds}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={resetTimer}>
              <Text style={{color: '#fff', fontSize: 16}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={startTimer}>
              <Text style={{color: '#fff', fontSize: 16}}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  input: {
    width: 60,
    color: '#008786',
    backgroundColor: '#fff',
    borderColor: '#008786',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    height: 60,
    borderWidth: 2,
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

export default InputScreen;
