import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { View, Text, StyleSheet, TextInput } from "react-native";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { GET_USER_DATA } from "../queries/user";
import { Snackbar } from "react-native-paper";
import { ADD_CHALLENGE } from "../queries/challenge";
import { globalStyles } from "../styles/global";
import SubmitButton from "../shared/submit";
import CalendarPicker from "react-native-calendar-picker";

const reviewSchema = yup.object({
  //   amount: yup.number().required(), //may not need for actual fields
});

export default () => {
  const [addChallenge] = useMutation(ADD_CHALLENGE);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <Formik
      initialValues={{ type: "big-saver", startDate: null, endDate: null }}
      validationSchema={reviewSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        addChallenge({
          variables: {
            type: values.type,
            startDate: values.startDate,
            endDate: values.endDate,
          },
          update: (cache, { data: { addChallenge } }) => {
            const data = cache.readQuery({ query: GET_USER_DATA });
            cache.writeQuery({
              query: GET_USER_DATA,
              data: {
                challenges: [...data.challenges, addChallenge],
              },
            });
          },
        })
          .then(res => {
            setVisible(true);
          })
          .catch(err => {
            setFieldError("amount", err.message); //set for input fields
            setSubmitting(false);
          });
      }}
    >
      {formikProps => (
        <View style={styles.formContainer}>
          <Picker
            autoCapitalize="none"
            name="type"
            style={styles.picker}
            onValueChange={formikProps.handleChange("type")}
            selectedValue={formikProps.values.type}
          >
            <Picker.Item label="Big Saver" value="big-saver" />
            <Picker.Item label="Big Spender" value="big-spender" />
            <Picker.Item label="Hermit" value="hermit" />
            <Picker.Item label="Traveler" value="traveler" />
            <Picker.Item label="Smart Shopper" value="smart-shopper" />
          </Picker>

          <CalendarPicker />
          {/* <Text style={globalStyles.errorText}>
              {formikProps.touched.amount && formikProps.errors.amount} //come back to this
            </Text> come back to this */}

          <SubmitButton onPress={formikProps.handleSubmit} text="Submit" />
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            style={styles.snack}
          >
            Your {formikProps.values.category} budget was added!
          </Snackbar>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    margin: 5,
    width: 300,
    backgroundColor: "white",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    fontSize: 18,
    borderRadius: 6,
    margin: 5,
    width: 300,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 30,
    color: "#333",
    padding: 30,
  },
  snack: {
    backgroundColor: "green",
    width: "100%",
    fontSize: 16,
    alignSelf: "center",
  },
});
