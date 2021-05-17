import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function DeleteButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deleteTouch}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "red",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  deleteTouch: {
    marginLeft: 60,
    width: 85,
  },
});
