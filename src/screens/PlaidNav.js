import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PlaidNav({ navigation }) {
  const goToPlaid = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Plaid" }],
    });
  };
  return (
    <View style={styles.container}>
      <Text>Let&apos;s Add your bank account information!</Text>
      <TouchableOpacity style={styles.button} onPress={goToPlaid}>
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "70%",
    marginHorizontal: "15%",
  },
  button: {
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 80,
    backgroundColor: "#00A86B",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
