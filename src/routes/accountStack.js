/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account";
import AllAccounts from "../screens/AllAccounts";
import ChangeAvatar from  '../screens/ChangeAvatar'

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Account'
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='All Accounts'
        component={AllAccounts}
        options={({ navigation }) => ({
          title: '',
          headerTintColor: '#00A86B',
        })}
      />
      <Stack.Screen
        name='Change Avatar'
        component={ChangeAvatar}
        options={({ navigation }) => ({
          title: '',
          headerTintColor: '#00A86B',
        })}
      />
    </Stack.Navigator>
  );
}
