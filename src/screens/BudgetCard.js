import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categoryIcons = {
  Shops: <FontAwesome name='shopping-cart' size={30} color='#00A86B' />,
  Travel: <FontAwesome name='car' size={30} color='#00A86B' />,
  Transfer: (
    <MaterialCommunityIcons name='arrow-left-right' size={30} color='#00A86B' />
  ),
  'Food and Drink': (
    <MaterialCommunityIcons
      name='silverware-fork-knife'
      size={30}
      color='#00A86B'
    />
  ),
  Entertainment: <FontAwesome name='film' size={30} color='#00A86B' />,
  Other: <FontAwesome5 name='money-check-alt' size={30} color='#00A86B' />,
  Payment: <FontAwesome name='money' size={30} color='#00A86B' />,
};

export default function Card({ children, item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.categoryPic}>
          {categoryIcons[item.category] || categoryIcons.Other}
        </View>
        {children}
      </View>
    </View>
  );
}

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

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
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryPic: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderColor: 'red',
    backgroundColor: '#E0FFE8',
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
