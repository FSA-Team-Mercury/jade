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
        subtype
        balances {
          current
        }
      }
      transactions {
        account_id
        amount
        date
        category
        pending
        merchant_name
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
  console.log("server data for Plaid ---> ", data);
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
