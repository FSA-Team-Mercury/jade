import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SavingsCard({children}) {

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.categoryPic}>
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'white',

    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 5,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryPic: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: 'red',
    backgroundColor: '#00A86B',
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
