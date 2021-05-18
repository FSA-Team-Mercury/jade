import React, { useState, useEffect } from "react";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Button,
} from "react-native";
import { client } from "../../App";
import { accountStyles } from "../styles/account_screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GET_USER } from "../queries/user";

//import { gql, useMutation } from "@apollo/client";

// const SET_EXPO_TOKEN = gql`
//   mutation SetExpoToken($token: String!) {
//     addPushToken(token: $token) {
//       notification_token
//       username
//     }
//   }
// `;

export default function Account(props) {
  // const [setTokenDB] = useMutation(SET_EXPO_TOKEN);
  // const [expoPushToken, setExpoPushToken] = useState("");
  const [user, setUser] = useState(null);

  // const tokenEvent = async () => {
  //   const token = await registerForPushNotificationsAsync();
  //   setExpoPushToken(token);
  //   const db_token = await setTokenDB({
  //     variables: {
  //       token,
  //     },
  //   });
  // };

  useEffect(() => {
    const data = client.readQuery({
      query: GET_USER,
    });
    //tokenEvent();
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
      </View>
      {/* <Button title="Send Notification!" /> */}
      <TouchableOpacity
        style={accountStyles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={accountStyles.logoutButtonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;

//     console.log("my push token --->", token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }
