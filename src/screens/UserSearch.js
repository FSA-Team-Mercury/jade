import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { client } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { gql , useQuery } from "@apollo/client";
import FriendCard from "./FriendCard";
import ExplorePage from "./ExplorePage";

const GET_USERS = gql`
    query searchUsers($search: String){
        searchUsers(search: $search){
            result {
                id
                username
            }

        }
    }
`;

// add in accepted imageUrl id after testing

export default function UserSearch({navigation, route}) {
//   const [allFriends, setAllFriends] = useState(null);
    const {data, loading, error} = useQuery(GET_USERS, {variables: {search: "murphy"}})
    if (loading) {
    return (
        <View>
        <ActivityIndicator size="large" color="#00A86B" />
        </View>
        );
    }
    console.log('here')
    console.log('props-->', route.params)
    console.log('data-->', data)

//   useEffect(() => {
//     // const { user } = client.readQuery({ //coment back in once query is working
//     //   query: GET_USER,
//     // });
//     setAllFriends(user.friends);
//   }, []);

//   if (!allFriends) {
//     return (
//       <View>
//         <ActivityIndicator size="large" color="#00A86B" />
//       </View>
//     );
//   }
  return (<Text>Loaded</Text>)
}
