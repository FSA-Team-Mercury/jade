import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { client } from "../../App";
import { gql, useQuery, useMutation } from "@apollo/client";
import Challenges from "./Challenges";
import MultiPlayerChallenges from "./MultiPlayerChallenges";
const GET_BADGES = gql`
  query GetBadges {
    userBadges {
      id
      type
      badgeImage
    }
  }
`;
const images = {
  rainbow: require("../../assets/badges/rainbow.png"),
  earth: require("../../assets/badges/earth.png"),
  thunder: require("../../assets/badges/thunder.png"),
  cascade: require("../../assets/badges/cascade.png"),
};

export default function Badges(props) {
  const [allBadges, setAllBadges] = useState(null);

  useEffect(() => {
    const data = client.readQuery({
      query: GET_BADGES,
    });
    setAllBadges(data.userBadges);
  });

  if (!allBadges) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={style.multiChallenges}>
        <MultiPlayerChallenges {...props} />
      </View>
      <View style={style.container}>
        <View style={style.badges}>
          <FlatList
            data={allBadges}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={style.badgeContainer}>
                <Image
                  style={style.badgeImage}
                  source={images[item.badgeImage]}
                />
                <Text style={style.badgeType}>{item.type}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Challenges")}
          >
            <Text>Challenges</Text>
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

const shadow = {
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const style = StyleSheet.create({
  multiChallenges: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'flex-start',
  },
  badges: {
    width: "95%",
    ...center,
  },

  badgeContainer: {
    flex: 1,
    flexDirection: "column",
  },

  badgeType: {
    fontSize: 18,
    color: "#00A86B",
  },

  badgeImage: {
    height: 100,
    width: "25%",
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 20,
  },
});
