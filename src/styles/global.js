import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: "#007AFF",
    width: 200,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginTop: 6,
    textAlign: "center",
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "lightgrey",
    marginLeft: 10,
    marginRight: 10,
  },
});

export const images = {
  avatar: {
    rihanna: require("../../assets/images/icons8-rihanna-96.png"),
    ozil: require("../../assets/images/icons8-ozil-96.png"),
    salah: require("../../assets/images/icons8-salah-96.png"),
    robo: require("../../assets/images/icons8-bmo-48.png"),
    "sophia-loren": require("../../assets/images/icons8-sophia-loren-48.png"),
    beyonce: require("../../assets/images/icons8-beyonce-48.png"),
    "bad-bunny": require("../../assets/images/icons8-bad-bunny-48.png"),
  },
  badges: {
    rainbow: require("../../assets/badges/rainbow.png"),
    earth: require("../../assets/badges/earth.png"),
    thunder: require("../../assets/badges/thunder.png"),
    cascade: require("../../assets/badges/cascade.png"),
    boulder: require("../../assets/badges/boulder.png"),
    marsh: require("../../assets/badges/marsh.png"),
    soul: require("../../assets/badges/soul.png"),
    volcano: require("../../assets/badges/volcano.png"),
  },
};
