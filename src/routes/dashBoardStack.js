/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllTransactions from "../screens/AllTransactions";
import Dashboard from "../screens/Dashboard";

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          title: "",
          headerTintColor: "#00A86B",
        })}
      />

      <Stack.Screen
        name="All Transactions"
        component={AllTransactions}
        options={({ navigation }) => ({
          title: "",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}
