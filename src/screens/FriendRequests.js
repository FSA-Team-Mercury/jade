import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { client } from "../../App";
import { useMutation } from "@apollo/client";
import {
  FETCH_PENDING_FRIENDS,
  ACCEPT_FRIEND_REQ,
  FETCH_FRIENDS,
} from "../queries/friends";

export default function FriendRequests() {
  const [acceptFriend] = useMutation(ACCEPT_FRIEND_REQ);
  const [pendingFriends, setPendingFriends] = useState([]);

  useEffect(() => {
    const { pendingFriends } = client.readQuery({
      query: FETCH_PENDING_FRIENDS,
    });
    setPendingFriends(pendingFriends);
  }, []);

  if (!pendingFriends) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  async function acceptReq(friendId) {
    await acceptFriend({
      variables: {
        friendId,
      },
      update: (cache, { data: { addBudget } }) => {
        const data = cache.readQuery({ query: FETCH_FRIENDS });
        cache.writeQuery({
          query: FETCH_FRIENDS,
          data: {
            budgets: [...data.budgets, addBudget],
          },
        });
      },
    });
  }

  return (
    <View style={styles.friendReqBody}>
      {!pendingFriends.length ? (
        <Text>No friend requests</Text>
      ) : (
        pendingFriends.map((user) => {
          return (
            <View style={styles.userContainer} key={user.id}>
              <View style={styles.levelOne}>
                <View style={styles.badgeImage}></View>
                <Text style={styles.username}>{user.username}</Text>
              </View>
              <View style={styles.levelTwo}>
                {/* <Text style={styles.dateRequested}>{user.createdAt}</Text> */}
                <TouchableOpacity
                  onPress={() => {
                    return acceptReq(user.id);
                  }}
                >
                  <Text style={styles.dateRequested}>Add as Friend</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const center = {
  marginLeft: "auto",
  marginRight: "auto",
};

const shadow = {
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10,
};

const styles = StyleSheet.create({
  friendReqBody: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    ...center,
    marginBottom: 20,
    marginTop: 20,
  },
  userContainer: {
    height: 120,
    width: "90%",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
    ...shadow,
  },
  levelOne: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeImage: {
    height: 70,
    width: 70,
    backgroundColor: "black",
    borderRadius: 100,
  },
  username: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  levelTwo: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  dateRequested: {
    fontSize: 15,
    fontWeight: "500",
  },
});
