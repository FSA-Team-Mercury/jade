/* eslint-disable react/display-name */
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";
import AllTransactions from "../screens/AllTransactions";
import Dashboard from "../screens/Dashboard";
import { FETCH_PLAID } from "../queries/plaid";

const Stack = createStackNavigator();

export default function DashboardStack() {
  const { data, loading } = useQuery(FETCH_PLAID);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={"Dashboard"}>
      <Stack.Screen name="Dashboard">
        {(props) => <Dashboard {...props} />}
      </Stack.Screen>

      <Stack.Screen name="All Transactions">
        {(props) => <AllTransactions {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
