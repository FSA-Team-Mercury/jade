import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const moment = require("moment");
moment().format();

export default function SingleChallenge({item}) {

  let today = moment(new Date()).format("MM-DD-YYYY");

  console.log('item-->', item)
  console.log('today-->', today)

  return (
    <View>
      <View style={styles.singleChallenge}>
        <View style={styles.type}>
          <Text
            style={styles.typeText}
            numberOfLines={2}
          >
            {item.type}
          </Text>

        {today < item.endDate ? 
            <Text
                style={styles.details}
                numberOfLines={2}
            > Status: Ongoing
            </Text> : 
            <Text
                style={styles.details}
                numberOfLines={2}
            > Status: Finished
            </Text>
        }

        {item.completed ? 
            <Text
                style={styles.details}
                numberOfLines={2}
            > Challenge Won!
            </Text> : 
            <Text
                style={styles.details}
                numberOfLines={2}
            > Challenge Incomplete
            </Text>
        }

        </View>
        {/* price and when it was bought on the bottom */}
        <View style={styles.dates}>
          <Text style={styles.date} numberOfLines={2}>
            Start Date: {item.startDate}
          </Text>
          <Text style={styles.date} numberOfLines={2}>
            End Date: {item.endDate}
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
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...center,
  },
  // catagoryPic: {
  //   height: 60,
  //   width: 60,
  //   borderRadius: 100,
  //   backgroundColor: "#E0FFE8",
  //   marginLeft: 10,
  //   marginRight: 10,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  type: {
    height: "42%",
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  typeText: {
    fontSize: 19,
    height: 24,
    color: colors.primary,
  },
  details: {
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