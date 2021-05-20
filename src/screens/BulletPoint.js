import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default ({ textItem, itemAmount, colorText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dot}></View>

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
    height: 100,
    width: '130%',
    display: 'flex',
    // flexDirection: 'column',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  //#E0FFE8
  // #00A86B
  category: {
    height: '70%',
    width: '60%',
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
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  analysis: {
    fontSize: 16,
    height: 16,
    padding: 0,
    margin: 0,
  },
  amount: {
    fontSize: 20,
    height: 14,
  },
});


