import React from "react";
import { View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";
import TabNav from "../routes/tabNavigator";

const GET_USER = gql`
  query GetUser {
    user {
      id
      username
    }
  }
`;
export default function Home(props) {
  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return (
      <View>
        <Text>LOADING JADE...</Text>
      </View>
    );
  }

  return <TabNav {...props} />;
}
