import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <ImageBackground
      style={styles.header}
      source={require("../assets/space_bg.png")}
    >
      <View style={styles.headerContent}>
        <MaterialIcons
          name="menu"
          size={32}
          style={styles.icon}
          onPress={openMenu}
        />
        <View style={styles.headerTitle}>
          <Image
            source={require("../assets/mega_helmet-4.png")}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 390,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 10,
    color: "white",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 40,
    height: 40,
    marginHorizontal: 9,
  },
  headerContent: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
