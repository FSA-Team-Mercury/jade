/* eslint-disable react/display-name */
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { gql, useQuery } from "@apollo/client";
import AllTransactions from "../screens/AllTransactions";
import Dashboard from "../screens/Dashboard";

const Stack = createStackNavigator();
const FETCH_PLAID = gql`
  query FetchPlaid {
    plaid {
      total_transactions
      accounts {
        name
        type
      }
      transactions {
        account_id
        amount
        date
        merchant_name
        category
        pending
      }
      institution {
        logo
        name
        url
        primary_color
      }
    }
  }
`;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
