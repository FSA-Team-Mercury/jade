import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { images } from "../styles/global";
import { useMutation, useApolloClient } from "@apollo/client";
import {
  FETCH_PENDING_FRIENDS,
  ACCEPT_FRIEND_REQ,
  FETCH_FRIENDS,
} from "../queries/friends";

export default function FriendRequests() {
  const [acceptFriend] = useMutation(ACCEPT_FRIEND_REQ);
  const [pendingFriends, setPendingFriends] = useState(null);
  const isFocused = useIsFocused();
  const client = useApolloClient();

  useEffect(() => {
    const { pendingFriends } = client.readQuery({
      query: FETCH_PENDING_FRIENDS,
    });
    setPendingFriends(pendingFriends);
  }, [isFocused]);

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
      refetchQueries: [{ query: FETCH_FRIENDS }],
      update(cache) {
        cache.modify({
          fields: {
            pendingFriends(pendingList, { readField }) {
              return pendingList.filter(
                (friendRef) => friendId !== readField("id", friendRef)
              );
            },
          },
        });
      },
    });
    setPendingFriends(
      pendingFriends.filter((user) => {
        return friendId !== user.id;
      })
    );
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
                <View style={styles.userAvatar}>
                  <Image
                    source={images.avatar[user.profileImage]}
                    style={styles.userImage}
                  />
                </View>
                <Text style={styles.username}>{user.username}</Text>
              </View>
              <View style={styles.levelTwo}>
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
  userAvatar: {
    height: 60,
    width: 60,
    backgroundColor: "lightgrey",
    borderRadius: 100,
  },
  userImage: {
    width: 40,
    height: 40,
    flex: 1,
    marginLeft: 10,
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
    color: "#00A86B",
  },
});
