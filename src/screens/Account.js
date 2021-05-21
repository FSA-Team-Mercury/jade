import React, { useState, useEffect } from "react";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { client } from "../../App";
import { accountStyles } from "../styles/account_screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_USER } from "../queries/user";
import { images, globalStyles } from "../styles/global";

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
