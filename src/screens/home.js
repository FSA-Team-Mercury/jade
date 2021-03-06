import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../queries/user";
import PlaidNav from "./PlaidNav";

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

  if (data && data.user.accounts.length) {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Nav" }],
    });
    return <View></View>;
  }
  //Goes to Plaid if user has no account
  return <PlaidNav {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
