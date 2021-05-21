import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { images } from "../styles/global";
import { client } from "../../App";
import { FETCH_ALL_CHALLENGES } from "../queries/multiChallenges";

export default function MultiPlayerChallenges(props) {
  const [challenges, setChallenges] = useState([]);
  const isFocused = useIsFocused();
  console.log("props -->", props.route);
  useEffect(() => {
    const { allMultiPlayerChallenges } = client.readQuery({
      query: FETCH_ALL_CHALLENGES,
    });

    setChallenges(allMultiPlayerChallenges.multiPlayerChallenges);
    return () => {
      console.log("unmounting multi user challenges");
    };
  }, [isFocused, challenges]);

  if (!challenges.length) {
    return (
      <View style={styles.noChallenges}>
        <Text style={styles.noChallengeText}>No Challenges</Text>
      </View>
    );
  }
  return (
    <View style={styles.challengePage}>
      {challenges.map((challenge) => {
        const contenders = challenge.users;
        return (
          <View style={styles.container} key={challenge.id}>
            <View>
              <View style={styles.levelOne}>
                <View style={styles.badgeImageContainer}>
                  <Image
                    source={images.badges[challenge.badgeImage]}
                    style={styles.profilePic}
                  />
                </View>
                <View>
                  <Text style={styles.name}> {challenge.name}</Text>
                </View>
                <TouchableOpacity style={styles.view}>
                  <Text style={{ color: "white" }}>View Status</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ marginRight: "auto", marginLeft: "auto" }}>Vs.</Text>
            <View style={styles.levelThree}>
              {contenders.map((user) => {
                return (
                  <View style={styles.badge} key={user.id}>
                    <Image
                      style={styles.badgeImage}
                      source={images.avatar[user.profileImage]}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
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
  noChallenges: {
    height: 80,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    ...shadow,
  },
  noChallengeText: {
    fontSize: 18,
    color: "black",
  },
  page: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
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
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "3%",
    paddingBottom: "3%",
    ...shadow,
    ...center,
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
