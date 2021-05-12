/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import Dashboard from "../screens/Dashboard";
import Budget from "../screens/Budget";
import Friends from "../screens/Friends";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AccountStack from "./accountStack";
import { useQuery, gql } from "@apollo/client";

const Tab = createBottomTabNavigator();

const FETCH_PLAID = gql`
  mutation FetchPlaid($access_token: String!) {
    plaid(access_token: $access_token) {
      total_transactions
      accounts {
        name
        type
      }
      transactions {
        account_id
        amount
      }
    }
  }
`;

export default function TabNav() {
  // if (loading) {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#00A86B" />
  //     </View>
  //   );
  // }
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#00A86B",
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={Budget}
        options={{
          tabBarLabel: "Budget",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calculator"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      >
        {(props) => <AccountStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
