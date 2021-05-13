import React,{useState, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import  Ionicons from 'react-native-vector-icons/Ionicons'
import  MaterialCommunityIcons
 from 'react-native-vector-icons/MaterialCommunityIcons'

const categoryIcons = {
  Shops: <FontAwesome name="shopping-cart" size={30} color="black" />,
  Travel: <FontAwesome name="car" size={30} color="black" />,
  Transfer: <MaterialCommunityIcons name="arrow-left-right" size={30} color='black' />,
  'Food and Drink': <MaterialCommunityIcons name="silverware-fork-knife" size={30} color="black" />,
  Entertainment: <FontAwesome name="film" size={30} color="black" />,
  Other: <FontAwesome5 name="money-check-alt" size={30} color="black" />,
  Payment:<FontAwesome name="money" size={30} color="black" />
};


const SingleTransaction = ({item})=>{
  const date = item.date
  if (item.category.includes('Payment') || item.category.includes('Transfer')){
    item = {...item}
    item.merchant_name = item.category[0]
    item.category = ['']
  }

  return (
    <View>
      <View style={styles.singleTransaction}>
        {/* catigory picture (entertainment, food, shoping...) */}
        <View style={styles.catagoryPic}>
          {
            categoryIcons[item.category[0]] || categoryIcons.Other
          }

        </View>
        {/* componay name and catagory on the bottom */}
        <View style={styles.nameAndCategory}>
          <Text
            style={styles.companyName}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {item.merchant_name}{" "}
          </Text>
          <Text
            style={styles.purchaseCategory}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {item.category[0]}
          </Text>
        </View>
        {/* price and when it was bought on the bottom */}
        <View style={styles.priceAndDate}>
          <Text
            style={styles.price}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {`$${item.amount }`}{" "}
          </Text>
          <Text
            style={styles.date}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            { date}
          </Text>
        </View>
      </View>
      <View style={styles.borderBottom}></View>
    </View>
  )
}


const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const colors = {
  primary: "black",
};

const shadow = {
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const styles = StyleSheet.create({
  singleTransaction: {
    height: 100,
    width: "98%",
    // backgroundColor: "lightgrey",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...center,
  },
  catagoryPic: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#00A86B",
    marginLeft: 10,
    marginRight: 10,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameAndCategory: {
    height: "42%",
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 16,
    height: 16,
    color: colors.primary,
  },
  purchaseCategory: {
    fontSize: 14,
    height: 14,
    color: "#585252",
  },
  priceAndDate: {
    height: "42%",
    flex: 1,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    // backgroundColor:'red',
    marginLeft: "auto",
  },
  price: {
    fontSize: 16,
    marginLeft: "auto",
  },
  date: {
    marginLeft: "auto",
    color: "#585252",
  },
  borderBottom: {
    height: 2,
    width: "90%",
    backgroundColor: "lightgrey",
    ...center,
  },
});

export default SingleTransaction
