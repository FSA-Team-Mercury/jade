/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Text} from 'react-native'
import Friends from "../screens/Friends";
import SingleFriend from "../screens/SingleFriend";
import AddFriend from "../screens/AddFriend";
import FriendsHeader from '../shared/friendsHeader'

const Stack = createStackNavigator();

export default function FriendsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: true,
          title: <FriendsHeader />,
          headerStyle: {height: 120}
        }}
      />

      <Stack.Screen
        name="Single Friend"
        component={SingleFriend}
        options={({ navigation }) => ({
          title: "single friend",
          headerTintColor: "#00A86B",
        })}
      />
      
        <Stack.Screen
        name="Add Friend"
        component={AddFriend}
        options={({ navigation }) => ({
          title: "",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}
