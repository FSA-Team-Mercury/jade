import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image as Img,
} from "react-native";
import { gql } from "@apollo/client";
import { client } from "../../App";

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
