import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { signinStyles } from "../styles/signin";
import { useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { Formik } from "formik";
import * as yup from "yup";
import { LOGIN } from "../queries/user";

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useMutation(LOGIN);
  const goToSignup = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={signinStyles.container}>
        <Image
          source={require("../../assets/jade_transparent.png")}
          style={signinStyles.logo}
        />
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={async (text, { setSubmitting, setFieldError }) => {
            //logic to handle login
            try {
              setIsLoading(true);
              const { data } = await login({
                variables: {
                  username: text.username,
                  password: text.password,
                },
              });
              await AsyncStorage.clear();
              await AsyncStorage.setItem("TOKEN", data.logIn.token);

              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            } catch (err) {
              setFieldError("loginError", err.message);
              setSubmitting(false);
              console.log(err);
            }
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
              <FlatButton
                text={
                  isLoading ? (
                    <ActivityIndicator
                      animating={isLoading}
                      color="white"
                      size="small"
                    />
                  ) : (
                    "Sign In"
                  )
                }
                onPress={formikProps.handleSubmit}
                isLoading={isLoading}
              />
              <Text style={signinStyles.errorText}>
                {formikProps.errors.loginError}
              </Text>
            </View>
          )}
        </Formik>
        <View style={signinStyles.signupContainer}>
          <Text>new to Jade? </Text>
          <TouchableOpacity
            onPress={goToSignup}
            style={signinStyles.signupTouch}
          >
            <Text style={signinStyles.signupButton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
