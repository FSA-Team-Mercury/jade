import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import MutualFriends from "./MutualFriends";
import ExploreFriends from "./ExploreFriends";
import { client } from "../../App";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import FriendRequests from './FriendRequests'
import Badges from "./Badges";

export default function ExplorePage() {
  const [selected, setSelected] = useState("FRIENDS");
  const navigation = useNavigation();

  const display = {
    PENDING_FRIENDS: <FriendRequests />,
    FRIENDS: <ExploreFriends />,
    BADGES: <Badges {...props}/>,
  };

  function handlePress(pageName) {
    setSelected(pageName);
  }

  function searchUsers(search) {
    navigation.navigate("Search Users", {
      search,
    });
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchBox}>
          <Image
            source={require("../../assets/icons/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchField}
            placeholder="Search..."
            onSubmitEditing={event => {
              let search = event.nativeEvent.text;
              return searchUsers(search);
            }}
          />
        </View>
        <Text style={styles.pageTitle}>Explore Jade</Text>
        <View style={styles.selectView}>
          <TouchableOpacity
            style={
              selected === "FRIENDS"
                ? styles.selectedViewBtn
                : styles.nonSelectViewBtn
            }
            onPress={() => handlePress("FRIENDS")}
          >
            <Text
              style={
                selected === "FRIENDS"
                  ? styles.selectedText
                  : styles.nonSelectedText
              }
            >
              Friends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              selected === "PENDING_FRIENDS"
                ? styles.selectedViewBtn
                : styles.nonSelectViewBtn
            }
            onPress={() => handlePress("PENDING_FRIENDS")}
          >
            <Text
              style={
                selected === "PENDING_FRIENDS"
                  ? styles.selectedText
                  : styles.nonSelectedText
              }
            >
              Friend Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              selected === "BADGES"
                ? styles.selectedViewBtn
                : styles.nonSelectViewBtn
            }
            onPress={() => handlePress("BADGES")}
          >
            <Text
              style={
                selected === "BADGES"
                  ? styles.selectedText
                  : styles.nonSelectedText
              }
            >
              Badges
            </Text>
          </TouchableOpacity>
        </View>
        {display[selected]}

      </ScrollView>
    </SafeAreaView>
  );
}

const shadow = {
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10,
};

const center = {
  marginLeft: "auto",
  marginRight: "auto",
};

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // alignItems: "center",
  },
  searchBox: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    ...center,
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  searchField: {
    height: 30,
    width: "60%",
    marginLeft: 10,
  },
  pageTitle: {
    fontSize: 30,
    marginBottom: 20,
    ...center,
  },
  selectView: {
    height: 50,
    width: "90%",
    backgroundColor: "#f4f6f8",
    // backgroundColor: 'lightgrey',
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
    ...center,
  },
  selectedViewBtn: {
    height: 35,
    width: 110,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    ...shadow,
  },
  nonSelectViewBtn: {
    height: 35,
    width: 100,
    // backgroundColor:'white',
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 12,
    color: "green",
  },
  nonSelectedText: {
    fontSize: 12,
    color: "black",
  },
});
