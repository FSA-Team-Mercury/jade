import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SingleAccount({ item }) {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: item.balances.iso_currency_code,
    maximumFractionDigits: 2,
  });
  const acctBalance = item.balances.current;

  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Text
        style={{
          color: acctBalance < 0 ? "red" : "green",
        }}
      >
        {priceFormatter.format(item.balances.current)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
