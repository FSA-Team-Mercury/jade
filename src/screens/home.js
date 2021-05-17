import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Plaid from "./Plaid";

export const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      username
      accounts {
        auth_token
      }
    }
    budgets {
      id
      category
      goalAmount
      currentAmount
    }
  }
`;

export default function Home(props) {
  const { data, loading, error } = useQuery(GET_USER_DATA);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
  if (data.user.accounts.length) {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Nav" }],
    });
  }
  //Goes to Plaid if user has no account
  return <Plaid {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
