import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Challenges from "./Challenges";
import Badges from "./Badges";
import { useApolloClient } from "@apollo/client";
import { FETCH_ALL_CHALLENGES } from "../queries/multiChallenges";

export default function ChallengesPage(props) {
  const [challenges, setChallenges] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    const { allMultiPlayerChallenges } = client.readQuery({
      query: FETCH_ALL_CHALLENGES,
    });

    setChallenges(allMultiPlayerChallenges.multiPlayerChallenges);
    return () => {
      console.log("unmounting multi user challenges");
    };
  }, []);

  return (
    <SafeAreaView>
      <Badges {...props} />
      <Challenges {...props} challenges={challenges} />
      <View style={style.container}>
        <View style={style.challenges}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Add Challenge", {
                challenges,
                setChallenges,
              })
            }
          >
            <View style={style.addChallenge}>
              <MaterialCommunityIcons
                name="plus-circle"
                color={"#00A86B"}
                size={60}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  noChallenges: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },
  emptyChallengeText: {
    fontSize: 18,
    color: "black",
  },
  challengesHeader: {
    height: 50,
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#00A86B",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  challenges: {
    width: "95%",
    ...center,
  },
  challengeContainer: {
    flex: 1,
    flexDirection: "column",
  },

  challengeType: {
    fontSize: 18,
    color: "#00A86B",
  },

  addChallenge: {
    alignItems: "center",
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 20,
  },
});
