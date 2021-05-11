import { StyleSheet } from "react-native";

export const accountStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
  },
  userName: {
    fontSize: 27,
  },
  sectionCard: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    width: 300,
    height: 50,
    marginTop: 25,
    textAlign: "center",
    borderRadius: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
  sectionContainer: {
    marginTop: 60,
  },
  logoutButton: {
    marginTop: 90,
  },
  logoutButtonText: {
    color: "green",
    fontSize: 21,
  },
});
