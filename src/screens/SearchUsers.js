import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { images } from "../styles/global";
import { REQUEST_FRIENDSHIP, SEARCH_USERS } from "../queries/friends";

export default function SearchUsers({ route }) {
  // friendship type: FRIENDS, PENDING, NOT_FRIENDS
  const [oldSearch, setOldSearch] = useState("");
  const [requestFriendship] = useMutation(REQUEST_FRIENDSHIP);
  let search = route.params.search.toLowerCase();

  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: {
      search,
    },
  });

  if (loading) {
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#00A86B" />
    </View>;
  }
  useEffect(() => {
    return () => {
      console.log("unmounting search component");
    };
  }, []);

  if (oldSearch !== search) {
    setOldSearch(search);
  }

  async function addFriend(friendId) {
    await requestFriendship({
      variables: {
        friendId,
      },
      refetchQueries: [{ query: SEARCH_USERS, variables: { search } }],
      awaitRefetchQueries: true,
    });
  }
  const searchResults = data ? data.searchUsers.result : [];
  return (
    <ScrollView style={styles.container}>
      {!searchResults.length ? (
        <View style={styles.noResults}>
          <Text>No Reuslts</Text>
        </View>
      ) : (
        searchResults.map((user) => {
          return (
            <View style={styles.user} key={user.id}>
              <View style={styles.badgeImageContainer}>
                <Image
                  source={images.avatar[user.profileImage]}
                  style={styles.profilePic}
                />
              </View>
              <View>
                <Text style={styles.userName}>{user.username}</Text>
              </View>
              <TouchableOpacity
                disabled={
                  user.relationship === "FRIENDS" ||
                  user.relationship === "PENDING"
                    ? true
                    : false
                }
                style={{
                  ...styles.unfollow,
                  backgroundColor:
                    user.relationship === "FRIENDS"
                      ? "lightgrey"
                      : user.relationship === "PENDING"
                      ? "dodgerblue"
                      : "green",
                }}
                onPress={() => addFriend(user.id, user.relationship)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {user.relationship === "FRIENDS"
                    ? "Connected"
                    : user.relationship === "PENDING"
                    ? "Pending..."
                    : "Add Friend"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  user: {
    height: 100,
    width: "95%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    ...shadow,
  },
  noResults: {
    alignSelf: "center",
    top: "50%",
  },
  badgeImageContainer: {
    height: 65,
    width: 65,
    backgroundColor: "lightgrey",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
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
  unfollow: {
    height: 30,
    width: 100,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
  },
});
