import React from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  Button,
  Image,
} from "react-native";
import { signinStyles } from "../styles/signin";
import { useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { Formik } from "formik";
import * as yup from "yup";
import { SIGNUP } from "../queries/user";

const signupSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Signup(props) {
  const [signup] = useMutation(SIGNUP);
  const handleGoBack = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={signinStyles.container}>
      <Image
        source={require("../../assets/jade_transparent.png")}
        style={signinStyles.logo}
      />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={signupSchema}
        onSubmit={async (text, { setSubmitting, setFieldError }) => {
          //logic to handle signup
          try {
            const { data } = await signup({
              variables: {
                username: text.username,
                password: text.password,
              },
            });
            await AsyncStorage.clear();
            await AsyncStorage.setItem("TOKEN", data.signUp.token);
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          } catch (err) {
            setFieldError("signupFail", err.message);
            setSubmitting(false);
          }
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
            <Text style={signinStyles.errorText}>
              {formikProps.errors.signupFail}
            </Text>

            <Button title="cancel" onPress={handleGoBack} />
          </View>
        )}
      </Formik>
    </View>
  );
}
