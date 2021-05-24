import React, { useEffect, useState } from "react";
import { PLAID_TOKEN_URL } from "@env";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PlaidLink } from "react-native-plaid-link-sdk";
import axios from "axios";
import { useMutation, useApolloClient } from "@apollo/client";
import { USER_PLAID_AUTH } from "../queries/user";
import { FETCH_TOKEN } from "../queries/plaid.js";

export default function Plaid(props) {
  const [token, setToken] = useState(null);
  const [getPlaid] = useMutation(FETCH_TOKEN);
  const client = useApolloClient();
  const getToken = async () => {
    try {
      const { user } = await client.readQuery({
        query: USER_PLAID_AUTH,
      });
      const { data } = await axios.post(PLAID_TOKEN_URL, {
        client_user_id: user.id,
      });
      setToken(data.link_token);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!token) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <PlaidLink
      env="sandbox"
      tokenConfig={{
        token: token,
      }}
      onSuccess={async (success) => {
        try {
          await getPlaid({
            variables: {
              public_token: success.publicToken,
            },
          });
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Nav" }],
          });
        } catch (err) {
          throw new Error("Error Connectinig to Plaid", err);
        }
      }}
      onExit={(exit) => {
        console.log(exit);
      }}
    >
      <View style={styles.container}>
        <Text>Let&apos;s Add your bank account information!</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Account</Text>
        </View>
      </View>
    </PlaidLink>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "70%",
    marginHorizontal: "15%",
  },
  button: {
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 80,
    backgroundColor: "#00A86B",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
