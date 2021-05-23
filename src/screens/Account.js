import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useApolloClient } from "@apollo/client";
import { accountStyles } from "../styles/account_screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_USER } from "../queries/user";
import { images, globalStyles } from "../styles/global";
import { useIsFocused } from "@react-navigation/native";

export default function Account(props) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  useEffect(() => {
    const data = client.readQuery({
      query: GET_USER,
    });
    setUser(data && data.user);
  }, [isFocused, user]);

  const handleLogout = async () => {
    await client.clearStore();
    await AsyncStorage.removeItem("TOKEN");
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  if (!user) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  return (
    <View style={accountStyles.container}>
      <View style={globalStyles.profilePic}>
        <Image
          source={images.avatar[user.profileImage]}
          style={{ width: 60, height: 60 }}
        />
      </View>

      <Text style={accountStyles.userName}>{user ? user.username : ""}</Text>
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Change Avatar", user)}
        >
          <View style={accountStyles.sectionCard}>
            <Text>Change Avatar</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={"#00A86B"}
              size={30}
            />
          </View>
        </TouchableOpacity>
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
