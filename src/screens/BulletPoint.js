 import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default ({ textItem, itemAmount, colorText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dot}>
        <View style={styles.dot2}></View>
      </View>

      <View style={styles.category}>
        <Text style={styles.analysis}>{textItem}</Text>
        <Text style={(styles.amount, { color: colorText })}>${itemAmount}</Text>
      </View>
    </View>
  );
};

//STYLES

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  //#E0FFE8
  // #00A86B
  category: {
    height: '70%',
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dot: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: '#00A86B',
    marginLeft: 20,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot2: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: '#E0FFE8',
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysis: {
    fontSize: 17,
    height: 30,
  },
  amount: {
    fontSize: 25,
    height: 30,
  },
});


