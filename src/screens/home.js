import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Plaid from "./Plaid";

const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      accounts {
        auth_token
        type
      }
      budgets {
        category
        goalAmount
        isCompleted
      }
    }
  }
`;

export default function Home(props) {
  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  console.log("accounts: ", data.user.accounts.length);
  if (data.user.accounts.length) {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Nav" }],
    });
  }
  // Goes to Plaid if user has no account
  return <Plaid {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
