import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const convertHMS = () => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time - hours * 3600 - minutes * 60;
  setHour(hours);
  setMin(minutes);
  setSec(seconds);
};

const extra = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View style={styles.view}>
        <Text style={styles.text}>{hour}</Text>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
        {' '}
        :{' '}
      </Text>
      <View style={styles.view}>
        <Text style={styles.text}>{min}</Text>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008786'}}>
        {' '}
        :{' '}
      </Text>
      <View style={styles.view}>
        <Text style={styles.text}>{sec}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    color: '#008786',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default extra;
