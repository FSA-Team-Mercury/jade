import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { client } from "../../App";
import { gql } from "@apollo/client";
import Challenges from "./Challenges";
import { images } from "../styles/global";
import { useIsFocused } from "@react-navigation/native";
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

export default function Badges(props) {
  const [allBadges, setAllBadges] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const data = client.readQuery({
      query: GET_BADGES,
    });
    setAllBadges(data.userBadges);
  }, [isFocused]);

  if (!allBadges) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  // badgesContainer
  return (
    <SafeAreaView>
      <View style={style.badgesHeader}>
        <Text style={style.badgesHeaderText}>Your Badges</Text>
      </View>
      <View style={style.badgesContainer}>
        {allBadges.length < 1 ? (
          <View style={style.noBadgesContainer}>
            <Text style={style.noBadges}>No Badges Yet!</Text>
          </View>
        ) : (
          <FlatList
            columnWrapperStyle={style.listStyle}
            numColumns={allBadges.length}
            data={allBadges}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={style.singleBadge}>
                <Image
                  style={style.badgeImage}
                  source={images.badges[item.badgeImage]}
                />
                <Text style={style.badgeType}>{item.type}</Text>
              </View>
            )}
          />
        )}
      </View>
      <Challenges {...props} />
    </SafeAreaView>
  );
}

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
  badgesContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "90%",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    ...shadow,
  },
  listStyle: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  singleBadge: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    width: 80,
    height: 80,
  },
  badgeType: {
    fontSize: 16,
    color: "#00A86B",
  },
  badgesHeader: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00A86B",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: "center",
    marginBottom: 5,
  },

  noBadgesContainer: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  noBadges: {
    fontSize: 18,
    color: "black",
  },
  badgesHeaderText: {
    fontSize: 22,
    color: "white",
  },
  badgeImage: {
    width: 50,
    height: 50,
  },
  categoryName: {
    fontSize: 20,
  },
  goalText: {
    fontSize: 20,
  },
});
