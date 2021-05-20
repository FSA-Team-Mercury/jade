import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18,
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
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
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
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
  },
};
