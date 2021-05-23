/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExplorePage from "../screens/ExplorePage";
import SearchUsers from "../screens/SearchUsers";
import Badges from "../screens/Badges";
import Challenges from "../screens/Challenges";

import SingleChallenge from '../screens/SingleChallenge'
import AddChallenge from "../screens/AddChallenge";

const Stack = createStackNavigator();

export default function ExplorPageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExplorePage"
        component={ExplorePage}
        options={({ navigation }) => ({
          title: "Explore",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="Search Users"
        component={SearchUsers}
        options={({ navigation }) => ({
          title: "Friends Search",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="Badges"
        component={Badges}
        options={({ navigation }) => ({
          title: "Badges",
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

      <Stack.Screen
        name="Single Challenge"
        component={SingleChallenge}
        options={({ navigation }) => ({
          title: "Challenge",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}
