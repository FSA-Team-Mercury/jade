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
  Picker,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_MULTI_PLAYER_CHALLENGE,
  FETCH_ALL_CHALLENGES,
  FETCH_CURENT_CHALLENGES,
  LEAVE_CHALLENGE,
} from "../queries/multiChallenges";

export default () => {
  const { data, loading, error } = useQuery(FETCH_ALL_CHALLENGES);
  const isFocused = useIsFocused();

  useEffect(() => {
    // console.log('endDate-->', endDate)
    return () => {
      console.log("unmounting multi user challenges");
    };
  }, [isFocused]);
  function getUsersCompeting(users) {
    const newObj = users.reduce((accum, user) => {
      accum.push();
    }, []);
  }
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  const { multiPlayerChallenges } = data.allMultiPlayerChallenges;
  // const userId = multiPlayerChallenges.id
  console.log("multiPlayerChallenges---->", data);
  if (!multiPlayerChallenges.length) {
    return <Text>No Challenges</Text>;
  }
  return (
    <View style={styles.challengePage}>
      <Text style={styles.title}>Challenges Against Friends</Text>
      {multiPlayerChallenges.map(challenge => {
        // console.log("cahllenge--->", challenge)
        const contenders = challenge.users;
        return (
          <View style={styles.container}>
            <View>
              <View style={styles.levelOne}>
                <View style={styles.badgeImageContainer}>
                  <Image
                    // source={images.avatar[user.badgeImage]}
                    style={styles.profilePic}
                  />
                </View>
                <View>
                  <Text style={styles.name}> {challenge.name}</Text>
                  {/* <Text style={styles.userName}>UserName</Text> */}
                </View>
                <TouchableOpacity style={styles.view}>
                  <Text style={{ color: "white" }}>View Status</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ marginRight: "auto", marginLeft: "auto" }}>Vs.</Text>
            <View style={styles.levelThree}>
              {contenders.map(user => {
                return (
                  <View style={styles.badge}>
                    <View style={styles.badgeImage}></View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

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
  page: {
    width: '100%',
    alignItems: "center",
    backgroundColor:'black'
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    ...center,
    marginBottom: 20,
    marginTop: 10,
  },
  container: {
    height: 180,
    width: "90%",
    // backgroundColor: '#f4f6f8',
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "3%",
    paddingBottom: "3%",
    ...shadow,
    ...center
  },
  levelOne: {
    height: 70,
    width: "100%",
    // backgroundColor: 'lightgrey',
    flexDirection: "row",
    alignItems: "center",
  },
  badgeImageContainer: {
    height: 65,
    width: 65,
    backgroundColor: "black",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  userName: {
    fontSize: 12,
    fontWeight: "300",
  },
  levelTwo: {
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    height: 30,
    width: 100,
    backgroundColor: "#00A86B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
    marginBottom: 5,
  },
  levelThree: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  badge: {
    height: 60,
    width: 100,
    alignItems: "center",
  },
  badgeImage: {
    height: 50,
    width: 50,
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  badgeName: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: "500",
  },
});
