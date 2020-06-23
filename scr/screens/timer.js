import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TimerScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#008786" />
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
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={() => console.log('Stop is pressed')}>
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
  input: {
    width: 50,
    color: '#008786',
    backgroundColor: '#fff',
    borderColor: '#008786',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    height: 50,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  button: {
    marginHorizontal: 30,
    marginTop: 15,
    width: 60,
    height: 40,
    backgroundColor: '#008786',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimerScreen;
