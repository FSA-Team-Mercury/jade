import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import { images } from "../styles/global";
const SEARCH_USERS = gql`
  query SearchUsers($search: String) {
    searchUsers(search: $search) {
      result {
        username
        id
        profileImage
        relationship
      }
    }
  }
`;

const REQUEST_FRIENDSHIP = gql`
  mutation AddFriend($friendId: ID) {
    addFriend(friendId: $friendId) {
      friendId
      username
    }
  }
`;

export default function SearchUsers({ route }) {
  // friendship type: FRIENDS, PENDING, NOT_FRIENDS
  const [results, setResults] = useState(false);
  const [oldSearch, setOldSearch] = useState("");
  const [requestFriendship] = useMutation(REQUEST_FRIENDSHIP);
  let search = route.params.search.toLowerCase();
  console.log(search);
  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: {
      search,
    },
  });
  if (loading) {
    <View>
      <ActivityIndicator size="large" color="#00A86B" />
    </View>;
  }
  const result = data ? data.searchUsers.result : [];
  if (oldSearch !== search) {
    setOldSearch(search);
  }

  async function addFriend(friendId, relationship) {
    if (relationship !== "NOT_FRIENDS") {
      alert("you are friends with this user");
      return;
    }
    requestFriendship({
      variables: {
        friendId,
      },
    });
  }

  return (
    <View>
      {!result.length ? (
        <Text>No Reuslts</Text>
      ) : (
        result.map((user) => {
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
                style={styles.unfollow}
                onPress={() => addFriend(user.id, user.relationship)}
              >
                <Text style={{ color: "white" }}>Friend</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
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

const styles = StyleSheet.create({
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
  badgeImageContainer: {
    height: 65,
    width: 65,
    backgroundColor: "black",
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
    // backgroundColor: '#00A86B',
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
  },
});
