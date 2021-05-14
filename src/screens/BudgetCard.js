import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function Card (props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children}
      </View>

    </View>
  )
}

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#b3e9c7',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 15,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});