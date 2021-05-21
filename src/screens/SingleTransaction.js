import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment"

const categoryIcons = {
  Shops: <FontAwesome name="shopping-cart" size={30} color="#00A86B" />,
  Travel: <FontAwesome name="car" size={30} color="#00A86A" />,
  Transfer: (
    <MaterialCommunityIcons name="arrow-left-right" size={30} color="#00A86B" />
  ),
  "Food and Drink": (
    <MaterialCommunityIcons
      name="silverware-fork-knife"
      size={30}
      color="#00A86B"
    />
  ),
  Entertainment: <FontAwesome name="film" size={30} color="#00A86B" />,
  Other: <FontAwesome5 name="money-check-alt" size={30} color="#00A86B" />,
  Payment: <FontAwesome name="money" size={30} color="#00A86B" />,
};

const SingleTransaction = ({ item }) => {
  const date = item.date;
  const formatedDate = moment(date).format("MM-DD-YYYY")
  if (item.category.includes("Payment") || item.category.includes("Transfer")) {
    item = { ...item };
    item.merchant_name = item.category[0];
    item.category = [""];
  }

  return (
    <View>
      <View style={styles.singleTransaction}>
        {/* catigory picture (entertainment, food, shoping...) */}
        <View style={styles.catagoryPic}>
          {categoryIcons[item.category[0]] || categoryIcons.Other}
        </View>
        {/* componay name and catagory on the bottom */}
        <View style={styles.nameAndCategory}>
          <Text
            style={styles.companyName}
            ellipsizeMode='tail'
            numberOfLines={2}
          >
            {item.merchant_name}{' '}
          </Text>
          <Text
            style={styles.purchaseCategory}
            ellipsizeMode='tail'
            numberOfLines={2}
          >
            {item.category[0]}
          </Text>
        </View>
        {/* price and when it was bought on the bottom */}
        <View style={styles.priceAndDate}>
          <Text style={styles.price} ellipsizeMode='tail' numberOfLines={2}>
            {`$${item.amount}`}{' '}
          </Text>
          <Text style={styles.date} ellipsizeMode='tail' numberOfLines={2}>
            {formatedDate}
          </Text>
        </View>
      </View>
      <View style={styles.borderBottom}></View>
    </View>
  );
};

const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const colors = {
  primary: "black",
};


const styles = StyleSheet.create({
  singleTransaction: {
    height: 100,
    width: "98%",
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
    backgroundColor: "#E0FFE8",
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nameAndCategory: {
    height: "42%",
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 16,
    height: 22,
    color: colors.primary,
  },
  purchaseCategory: {
    fontSize: 14,
    height: 20,
    color: "#585252",
  },
  priceAndDate: {
    height: "42%",
    flex: 1,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
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

export default SingleTransaction;
