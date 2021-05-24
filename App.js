import React, { useState, useEffect } from "react";
import { JADE_SERVER } from "@env";
import { AsyncStorage, AppRegistry, LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import TabNav from "./src/routes/tabNavigator";
import Signup from "./src/screens/signup";
import { READ_USER } from "./src/queries/user";
const Stack = createStackNavigator();

const httpLink = createHttpLink({
  uri: JADE_SERVER,
  credentials: "same-origin",
});

const authLink = new ApolloLink(async (operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = await AsyncStorage.getItem("TOKEN");
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  uri: JADE_SERVER,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const res = client.readQuery({
      query: READ_USER,
    });
    if (res) {
      setUser(res.user);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? "Nav" : "Login"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login">
            {(props) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup">
            {(props) => <Signup {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Nav">
            {(props) => <TabNav {...props} client={client} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} client={client} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("jade", () => App);
