import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { PlaidLink } from "react-native-plaid-link-sdk";
import axios from "axios";
import { client } from "../../App";
import { useMutation, gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      accounts {
        auth_token
        type
      }
    }
  }
`;

const FETCH_TOKEN = gql`
  mutation FetchToken($public_token: String!) {
    fetchPlaidToken(public_token: $public_token) {
      auth_token
    }
  }
`;

export default function Plaid(props) {
  const [token, setToken] = useState(null);
  const [getPlaid] = useMutation(FETCH_TOKEN);

  const getToken = async () => {
    try {
      const q = await client.readQuery({
        query: GET_USER,
      });
      console.log(q.user);
      const { data } = await axios.post(
        "http://localhost:3000/plaid/link/token/create",
        {
          client_user_id: q.user.id,
        }
      );
      setToken(data.link_token);
    } catch (err) {
      throw err;
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
          .then(async (res) => {
            console.log(res);
            await AsyncStorage.setItem(
              "PLAID_TOKEN",
              res.data.fetchPlaidToken.auth_token
            );
          })
          .catch((err) => {
            console.log(err);
          });

        props.navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
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
