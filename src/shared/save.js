import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SaveButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.saveTouch}>
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
    paddingHorizontal: 14,
    backgroundColor: "#00A86B",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  saveTouch: {
    width: 155,
    marginRight: 60,
  },
});
