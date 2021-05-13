import React from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { signinStyles } from "../styles/signin";
import { gql, useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { Formik } from "formik";
import * as yup from "yup";

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(5),
  email: yup.string().email(),
});

const LOGIN = gql`
  mutation Signup($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
    }
  }
`;

export default function Signup(props) {
  const [login] = useMutation(LOGIN);

  return (
    <View style={signinStyles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={async (text, { resetForm }) => {
          //logic to handle login
          login({
            variables: {
              username: text.username,
              password: text.password,
            },
          })
            .then(async (res) => {
              await AsyncStorage.clear();
              await AsyncStorage.setItem("TOKEN", res.data.logIn.token);

              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            })
            .catch((err) => {
              console.log("error loggin in!!!", err);
            });
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              autoCapitalize="none"
              style={signinStyles.input}
              placeholder="Username"
              onChangeText={formikProps.handleChange("username")}
              value={formikProps.values.username}
              onBlur={formikProps.handleBlur("username")}
            />
            <Text style={signinStyles.errorText}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              name="password"
              style={signinStyles.input}
              placeholder="Password"
              onChangeText={formikProps.handleChange("password")}
              value={formikProps.values.password}
              onBlur={formikProps.handleBlur("password")}
            />
            <Text style={signinStyles.errorText}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text>

            <FlatButton text="Sign In" onPress={formikProps.handleSubmit} />
          </View>
        )}
      </Formik>
      <View style={signinStyles.signupContainer}>
        <Text>new to Jade? </Text>
        <TouchableOpacity>
          <Text style={signinStyles.signupButton}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
