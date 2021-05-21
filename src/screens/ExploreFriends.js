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
} from "react-native";

import { client } from "../../App";
import { gql, useQuery, useMutation } from "@apollo/client";
import { images } from "../styles/global";

const FETCH_FRIENDS = gql`
  query FetchFriends {
    friends {
      id
      username
      profileImage
      badges {
        type
        badgeImage
        createdAt
      }
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($friendId: ID) {
    unfollowUser(friendId: $friendId) {
      friendId
    }
  }
`;




export default function ExploreFriends() {
  const [friends, setFriends] = useState(false);
  const [unfollower] = useMutation(UNFOLLOW_USER);

  function unfollowUser(friendId) {
    unfollower({
      variables: {
        friendId,
      },
      update(cache) {
        cache.modify({
          fields: {
            friends(existingFriends, { readField }) {
              let newFriendList = existingFriends.filter(user => {
                return friendId !== readField("id", user);
              });
              return newFriendList;
            },
          },
        });
      },
    });
    setFriends(
      friends.filter(user => {
        console.log("in for loop!!!!-->>", user);
        return friendId !== user.id;
      })
    );
    // alert('fried',friendId,'is deleted')
  }

  const { data, loading, error } = useQuery(FETCH_FRIENDS);
  if (loading) {
    return (
      <View style={friend.container}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  console.log("SET BYE DB REQUEST", data.friends);
  if (!friends) {
    setFriends(data.friends || []);
  }

  console.log("setFrieds!!!\n\n", friends, "\n\n");
  return (
    <View style={friend.page}>
      {/* <Text>Hello from friends</Text> */}
      {!friends.length ? (
        <Text>No Friends Yet</Text>
      ) : (
        data.friends.map(user => {
          return (
            <View style={friend.container} key={user.id}>
              <View>
                <View style={friend.levelOne}>
                  <View style={friend.profileImageContainer}>
                    <Image
                      // source={images.badges[user.profileImage]}
                      style={friend.profilePic}
                    />
                  </View>
                  <View>
                    <Text style={friend.name}>{user.username}</Text>
                    {/* <Text style={friend.userName}>UserName</Text> */}
                  </View>
                  <TouchableOpacity
                    style={friend.unfollow}
                    onPress={() => unfollowUser(user.id)}
                  >
                    <Text style={{ color: "white" }}>Unfollow</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={friend.levelThree}>
                {!user.badges.length ? (
                  <Text>No Badges Yet</Text>
                ) : (
                  user.badges.slice(0,5).map(badge => {
                    console.log(badge)
                    return (
                      <View style={friend.badge}>
                        <Image style={friend.badgeImage} source={images.badges[badge.badgeImage]} />
                        <Text style={friend.badgeName}>{badge.type}</Text>
                      </View>
                    );
                  })
                )}
              </View>
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

const friend = StyleSheet.create({
  page: {
    flex: 1,
    marginRight: "auto",
    marginLeft: "auto",
    // backgroundColor:'yellow',
    alignItems: "center",
  },
  container: {
    height: 190,
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
  unfollow: {
    height: 30,
    width: 100,
    // backgroundColor: '#00A86B',
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: 10,
    marginBottom: 5,
  },
  levelThree: {
    flex: 1,
    // width:'90%',
    // backgroundColor: 'black',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  badge: {
    height: 60,
    width: 100,
    // backgroundColor: 'lightgrey',
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
