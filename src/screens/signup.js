import React from "react";
import { View, Text, TextInput, AsyncStorage } from "react-native";
import { signinStyles } from "../styles/signin";
import { gql, useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { Formik } from "formik";
import * as yup from "yup";

const signupSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
    }
  }
`;

export default function Signup(props) {
  const [signup] = useMutation(SIGNUP);

  return (
    <View style={signinStyles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={signupSchema}
        onSubmit={(text) => {
          //logic to handle login
          signup({
            variables: {
              username: text.username,
              password: text.password,
            },
          })
            .then(async (res) => {
              await AsyncStorage.clear();
              await AsyncStorage.setItem("TOKEN", res.data.signUp.token);

              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            })
            .catch((err) => {
              console.log("error signing up!!!", err);
            });
        }}
      >
        {(formikProps) => (
          <View>
            <Text style={signinStyles.errorText}>
              {formikProps.touched.email && formikProps.errors.email}
            </Text>
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

            <FlatButton text="Sign up" onPress={formikProps.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
