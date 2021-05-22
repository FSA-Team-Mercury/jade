import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Challenges from "./Challenges";
import Badges from "./Badges";
import { gql, useQuery } from "@apollo/client";
const FETCH_FRIENDS = gql`
  query FetchFriends {
    friends {
      id
      username
      profileImage
    }
  }
`;

export default function ChallengesPage(props) {
  const isFocused = useIsFocused();
  const { data, loading, error } = useQuery(FETCH_FRIENDS)
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  console.log('DATA!!!!--->', data)
  useEffect(() => {}, [isFocused]);

  return (
    <SafeAreaView>
      < Badges />
      <Challenges {...props} friends={data.friends}/>
      <View style={style.container}>
        <View style={style.challenges}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Add Challenge",{friends: data.friends})}
          >
            <View style={style.addChallenge}>
              <MaterialCommunityIcons
                name="plus-circle"
                color={"#00A86B"}
                size={70}
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

  challengesHeaderText: {
    fontSize: 22,
    color: "white",
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
    display: "flex",
    alignItems: "center",
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 20,
  },
});
