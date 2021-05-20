import React, { useEffect, useState } from "react";
import { PLAID_TOKEN_URL } from "@env";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PlaidLink } from "react-native-plaid-link-sdk";
import axios from "axios";
import { client } from "../../App";
import { useMutation } from "@apollo/client";
import { USER_PLAID_AUTH } from "../queries/user";
import { FETCH_TOKEN } from "../queries/plaid.js";

export default function Plaid(props) {
  const [token, setToken] = useState(null);
  const [getPlaid] = useMutation(FETCH_TOKEN);

  const getToken = async () => {
    try {
      const { user } = await client.readQuery({
        query: USER_PLAID_AUTH,
      });
      const { data } = await axios.post(
        PLAID_TOKEN_URL, //"http://localhost:3000/plaid/link/token/create",
        {
          client_user_id: user.id,
        }
      );
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
      tokenConfig={{
        token: token,
      }}
      onSuccess={(success) => {
        getPlaid({
          variables: {
            public_token: success.publicToken,
          },
        })
          .then((res) => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Nav" }],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      onExit={(exit) => {
        console.log(exit);
      }}
    >
      <View style={styles.container}>
        <Text>It seems you have not added an account yet</Text>
        <View style={styles.button}>
          <Text>Add Account</Text>
        </View>
      </View>
    </PlaidLink>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    marginLeft: "15%",
  },
  button: {
    width: 120,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 90,
    backgroundColor: "#00A86B",
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
