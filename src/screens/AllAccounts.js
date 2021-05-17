import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image as Img,
} from "react-native";
import { gql } from "@apollo/client";
import { client } from "../../App";
import SingleAccount from "./SingleAccount";

const FETCH_PLAID = gql`
  query FetchPlaid {
    plaid {
      accounts {
        name
        type
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

export default function AllAccounts() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const acc = client.readQuery({
      query: FETCH_PLAID,
    });
    setAccount(acc);
    console.log(acc);
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
        <Img
          style={styles.logo_img}
          source={{
            uri: `data:image/png;base64,${account.plaid.institution.logo}`,
          }}
        />
        {/* <FlatList
          data={account.accounts}
          keyExtractor={(item) => item.account_id}
          renderItem={({ item }) => {
            return (
              <View>
                <SingleAccount item={item} />
              </View>
            );
          }}
        ></FlatList> */}
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
  account_card: {
    width: 300,
    height: 200,
  },
  logo_img: {
    width: 50,
    height: 50,
  },
});
