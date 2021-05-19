import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default ({ textItem, itemAmount, colorText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dot}></View>

      <View style={styles.category}>
        <Text style={styles.analysis}>{textItem}</Text>
      </View>
      <Text style={styles.amount, {color: colorText}}>
        ${itemAmount}
      </Text>
    </View>
  );
};

//STYLES
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '98%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  category: {
    height: '42%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: '#E0FFE8',
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  analysis: {
    fontSize: 16,
    height: 16,
  },
  amount: {
    fontSize: 14,
    height: 14,

  },
});


