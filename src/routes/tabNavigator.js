/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet } from "react-native";
import BudgetStack from "./budgetStack";
// import FriendsStack from "./friendsStack";
import Friends from '../screens/Friends'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AccountStack from "./accountStack";
import DashboardStack from "./dashBoardStack";
import Savings from '../screens/Savings'

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#00A86B',
        showIcon: true,
      }}
    >
      <Tab.Screen
        name='Dashboard'
        component={DashboardStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='view-dashboard'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Budget'
        component={BudgetStack}
        options={{
          tabBarLabel: 'Budget',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='calculator'
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Friends'
        component={Friends}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-group'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Savings'
        component= {Savings}
        options={{
          tabBarLabel: 'Savings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='piggy-bank' color={color} size={size} />
          ),
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name='Account'
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      >
        {(props) => <AccountStack {...props} />}
      </Tab.Screen>


    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
