import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BulletPoint({ textItem, itemAmount, colorText }) {
  return (
    <View style={styles.container}>
      <View style={styles.dot}>
        <View style={styles.dot2}></View>
      </View>

      <View style={styles.category}>
        <Text style={styles.analysis}>{textItem} </Text>
        <Text style={(styles.amount, { color: colorText })}>${itemAmount}</Text>
      </View>
    </View>
  );
}

//STYLES

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    height: "70%",
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: 22,
  },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: "#00A86B",
    marginLeft: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dot2: {
    height: 10,
    width: 10,
    borderRadius: 100,
    backgroundColor: "#E0FFE8",
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
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
