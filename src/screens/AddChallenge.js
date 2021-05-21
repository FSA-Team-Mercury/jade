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
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { GET_USER_DATA } from "../queries/user";
import { Snackbar } from "react-native-paper";
import { globalStyles } from "../styles/global";
import SubmitButton from "../shared/submit";
import SoloChallenge from './SoloChallenge'
import CreateMultiUserChallenge from "./CreateMultiUserChallenge";


import { gql, useQuery, useMutation } from "@apollo/client";
import {
  CREATE_MULTI_PLAYER_CHALLENGE,
  FETCH_ALL_CHALLENGES,
  FETCH_CURENT_CHALLENGES,
  LEAVE_CHALLENGE,
} from "../queries/multiChallenges";

const FETCH_FRIENDS = gql`
  query FetchFriends {
    friends {
      id
      username
      profileImage
    }
  }
`;

export default function AddChallenge({navigation}) {
  const [selected, setSelected] = useState('SOLO')
  const { data, loading, error } = useQuery(FETCH_FRIENDS);
  function handlePress(screen){
    setSelected(screen)
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  console.log("FRIENDS--->", data.friends)

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Choose a Challenge Type</Text>
        {/* <View style={styles.selectView}> */}
          {/* <TouchableOpacity
            style={
              selected === "SOLO"
                ? styles.selectedViewBtn
                : styles.nonSelectViewBtn
            }
            onPress={() => handlePress("SOLO")}
          >
            <Text
              style={
                selected === "SOLO"
                  ? styles.selectedText
                  : styles.nonSelectedText
              }
            >
              solo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              selected === "MULTI"
                ? styles.selectedViewBtn
                : styles.nonSelectViewBtn
            }
            onPress={() => handlePress("MULTI")}
          >
            <Text
              style={
                selected === "MULTI"
                  ? styles.selectedText
                  : styles.nonSelectedText
              }
            >
              Friends
            </Text>
          </TouchableOpacity> */}
        {/* </View> */}
        < CreateMultiUserChallenge  friends={data.friends} />
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
    position: "relative",
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
    marginTop: 20
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
  createChallengeBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#00A86B",
    ...shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 30,
  },
});
