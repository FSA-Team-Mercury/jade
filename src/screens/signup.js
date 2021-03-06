/* eslint-disable react/display-name */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { signinStyles } from "../styles/signin";
import { images } from "../styles/global";
import { useMutation } from "@apollo/client";
import FlatButton from "../shared/button";
import { Formik } from "formik";
import * as yup from "yup";
import { SIGNUP } from "../queries/user";
import DropDownPicker from "react-native-dropdown-picker";

const signupSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Signup(props) {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [signup] = useMutation(SIGNUP);
  const handleGoBack = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
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
          validationSchema={signupSchema}
          onSubmit={async (text, { setSubmitting, setFieldError }) => {
            //logic to handle signup
            try {
              if (!img) {
                setFieldError("signupFail", "An avatar choice is required");
                setSubmitting(false);
                throw new Error("An avatar choice is required");
              }
              const { data } = await signup({
                variables: {
                  username: text.username,
                  password: text.password,
                  profileImage: img,
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
                placeholderTextColor="lightgrey"
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
                placeholderTextColor="lightgrey"
                onChangeText={formikProps.handleChange("password")}
                value={formikProps.values.password}
                onBlur={formikProps.handleBlur("password")}
              />
              <Text style={signinStyles.errorText}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
              <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={img}
                setValue={setImg}
                items={[
                  {
                    label: "Riri",
                    value: "rihanna",
                    icon: () => (
                      <Image
                        source={images.avatar["rihanna"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Mezut",
                    value: "ozil",
                    icon: () => (
                      <Image
                        source={images.avatar["ozil"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Moe",
                    value: "salah",
                    icon: () => (
                      <Image
                        source={images.avatar["salah"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Benito",
                    value: "bad-bunny",
                    icon: () => (
                      <Image
                        source={images.avatar["bad-bunny"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Robo",
                    value: "robo",
                    icon: () => (
                      <Image
                        source={images.avatar["robo"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Bey",
                    value: "beyonce",
                    icon: () => (
                      <Image
                        source={images.avatar["beyonce"]}
                        style={styles.icon}
                      />
                    ),
                  },
                  {
                    label: "Sophie",
                    value: "sophia-loren",
                    icon: () => (
                      <Image
                        source={images.avatar["sophia-loren"]}
                        style={styles.icon}
                      />
                    ),
                  },
                ]}
                label="Choose your avatar!"
                placeholder="Choose an avatar..."
                style={styles.picker}
                defaultValue="Rihanna"
                containerStyle={styles.pickerContainer}
                itemStyle={styles.item}
                dropDownStyle={styles.item}
                textStyle={{
                  fontSize: 15,
                  color: "lightgrey",
                }}
              />
              <FlatButton text="Sign up" onPress={formikProps.handleSubmit} />
              <Text style={signinStyles.errorText}>
                {formikProps.errors.signupFail}
              </Text>
              <Button title="cancel" onPress={handleGoBack} />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "transparent",
    borderColor: "lightgrey",
    marginBottom: 50,
  },
  pickerContainer: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  item: {
    backgroundColor: "transparent",
  },
  icon: {
    width: 40,
    height: 40,
  },
});
