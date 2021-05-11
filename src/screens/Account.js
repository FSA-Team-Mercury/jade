import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, TouchableOpacity } from "react-native";
import { gql } from "@apollo/client";
import { client } from "../../App";
import { accountStyles } from "../styles/account_screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GET_USER = gql`
  query GetUser {
    user {
      id
      username
    }
  }
`;
export default function Account(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = client.readQuery({
      query: GET_USER,
    });
    setUser(data.user);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("TOKEN");
    await client.cache.reset();
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={accountStyles.container}>
      <Text style={accountStyles.userName}>
        Hello {user ? user.username : ""}!
      </Text>
      <View style={accountStyles.sectionContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("All Accounts")}
        >
          <View style={accountStyles.sectionCard}>
            <Text>Accounts</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={"#00A86B"}
              size={30}
            />
          </View>
        </TouchableOpacity>

        <View style={accountStyles.sectionCard}>
          <Text>Badges</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            color={"#00A86B"}
            size={30}
          />
        </View>
      </View>
      <TouchableOpacity
        style={accountStyles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={accountStyles.logoutButtonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
