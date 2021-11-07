import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image as Img,
} from "react-native";
import { useApolloClient } from "@apollo/client";

import SingleAccount from "./SingleAccount";
import { ACCOUNTS_AND_INSTITUTIONS } from "../queries/plaid";

export default function AllAccounts() {
  const [account, setAccount] = useState(null);
  const client = useApolloClient();
  useEffect(() => {
    const acc = client.readQuery({
      query: ACCOUNTS_AND_INSTITUTIONS,
    });

    setAccount(acc);
  }, []);

  if (!account) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.account_card,
          backgroundColor: account.plaid.institution.primary_color,
        }}
      >
        <View style={styles.header}>
          <Img
            style={styles.logo_img}
            source={{
              uri: `data:image/png;base64,${account.plaid.institution.logo}`,
            }}
          />
          <Text style={styles.headerText}>
            Your {account.plaid.institution.name} Accounts
          </Text>
        </View>

        <FlatList
          data={account.plaid.accounts}
          style={styles.accountList}
          keyExtractor={(item) => item.account_id}
          renderItem={({ item }) => {
            return (
              <View style={styles.accountContainer}>
                <SingleAccount item={item} />
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    marginRight: 20,
    marginTop: 15,
    color: "white",
    fontSize: 18,
  },
  account_card: {
    width: 369,
    height: 420,
    borderRadius: 6,
  },
  logo_img: {
    width: 50,
    height: 50,
    margin: 10,
    marginBottom: 0,
  },
  accountList: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  accountContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderRadius: 8,
    padding: 2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 3,
    backgroundColor: "white",
  },
});
