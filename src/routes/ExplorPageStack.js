/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExplorePage from "../screens/ExplorePage";
import SingleFriend from "../screens/SingleFriend";
import AddFriend from "../screens/AddFriend";
import FriendsHeader from "../shared/friendsHeader";
import SearchUsers from "../screens/SearchUsers";
import Badges from "../screens/Badges";
import Challenges from "../screens/Challenges";
// import AddChallenge from "../screens/AddChallenge-old";
import AddChallenge from "../screens/AddChallenge";

const Stack = createStackNavigator();

export default function ExplorPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExplorePage"
        component={ExplorePage}
        options={({ navigation }) => ({
          title: "Friends",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="Search Users"
        component={SearchUsers}
        options={({ navigation }) => ({
          title: "search",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="Add Friend"
        component={AddFriend}
        options={({ navigation }) => ({
          title: "user search",
          headerTintColor: "#00A86B",
        })}
      />
      <Stack.Screen
        name="Badges"
        component={Badges}
        options={({ navigation }) => ({
          title: "badges",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="Challenges"
        component={Challenges}
        options={({ navigation }) => ({
          title: "Challenges",
          headerTintColor: "#00A86B",
        })}
      />
      <Stack.Screen
        name="Add Challenge"
        component={AddChallenge}
        options={({ navigation }) => ({
          title: "Add Challenge",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}
