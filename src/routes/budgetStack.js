/* eslint-disable react/display-name */
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Budget from "../screens/Budget";
import SingleBudget from "../screens/SingleBudget";
import AddBudget from "../screens/AddBudget";

const Stack = createStackNavigator();

export default function BudgetStack() {
  const isFocused = useIsFocused();
  useEffect(() => {
    return () => {
      console.log("unmounting");
    };
  }, [isFocused]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Budget"
        component={Budget}
        options={{
          title: "Budgets",
          headerTintColor: "#00A86B",
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
          title: "Add Budget",
          headerTintColor: "#00A86B",
        })}
      />
    </Stack.Navigator>
  );
}
