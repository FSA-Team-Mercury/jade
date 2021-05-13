/* eslint-disable react/display-name */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Budget from "../screens/Budget";
import SingleBudget from "../screens/SingleBudget";
import AddBudget from "../screens/AddBudget";

const Stack = createStackNavigator();

export default function BudgetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Budget"
        component={Budget}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Single Budget"
        component={SingleBudget}
        options={({ navigation }) => ({
          title: "",
          headerTintColor: "#00A86B",
        })}
      />
        <Stack.Screen
        name="Add Budget"
        component={AddBudget}
        options={({ navigation }) => ({
          title: "",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}