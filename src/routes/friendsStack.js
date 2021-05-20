/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Friends from "../screens/Friends";
import SingleFriend from "../screens/SingleFriend";
import AddFriend from "../screens/AddFriend";
import FriendsHeader from "../shared/friendsHeader";
import SearchUsers from "../screens/SearchUsers";
import Badges from "../screens/Badges";
import Challenges from "../screens/Challenges";
import CreateMultiUserChallenge from "../screens/CreateMultiUserChallenge";
import AddChallenge from "../screens/AddChallenge";

const Stack = createStackNavigator();

export default function FriendsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: true,
          title: "Friends",
        }}
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

      {/* <Stack.Screen
        name="Add Challenge"
        component={CreateMultiUserChallenge}
        options={({ navigation }) => ({
          title: "Create A Challenge",
          headerTintColor: "#00A86B",
        })}
      /> */}

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
