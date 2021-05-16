import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 100,
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
  signupContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  signupButton: {
    color: "#00A86B",
  },
  cancel: {
    color: "#00A86B",
    marginTop: 20,
  },
  logo: {
    alignSelf: "center",
    width: 300,
    height: 200,
  },
});
