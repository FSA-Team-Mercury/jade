import React from "react";
import { View, Text } from "react-native";
import { PlaidLink } from "react-native-plaid-link-sdk";
import axios from "axios";
//import PlaidLink from "@burstware/expo-plaid-link";

export default function Plaid() {
  const TEST_LINK_TOKEN = "link-sandbox-9d3ded4a-0c7d-4aab-91d2-35d50fae422a";
  return (
    <PlaidLink
      tokenConfig={{
        token: "link-sandbox-740dc42e-018b-4b56-9baa-74415e74d706",
      }}
      onSuccess={async (success) => {
        console.log("public token --->", success.publicToken);
        try {
          const { data } = await axios.post(
            "http://localhost:3000/plaid/get_access_token",
            { public_token: success.publicToken }
          );
          console.log("access token --->", data);

          const { data: transactions } = await axios.post(
            "http://localhost:3000/plaid/transactions",
            {
              access_token: data.access_token,
            }
          );

          console.log("transactions --->", transactions);
        } catch (err) {
          console.log("error!!!!!", err);
        }

        //console.log("Success!!!!", success);
      }}
      onExit={(exit) => {
        console.log("exit --->", exit);
      }}
    >
      <Text>Add Account</Text>
    </PlaidLink>
  );
}
