import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  //depracated, but works better than the alternative
} from "react-native";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { GET_USER_DATA } from "../queries/user";
import { Snackbar } from "react-native-paper";
import { ADD_BUDGET } from "../queries/budget";
import { globalStyles } from "../styles/global";
import SubmitButton from "../shared/submit";
const reviewSchema = yup.object({
  amount: yup.number().required(),
});

export default function AddBudget({ navigation }) {
  const [addBudget] = useMutation(ADD_BUDGET);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ category: "Food and Drink", amount: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          addBudget({
            variables: {
              category: values.category,
              goalAmount: +values.amount,
              currentAmount: 5,
            },
            update: (cache, { data: { addBudget } }) => {
              const data = cache.readQuery({ query: GET_USER_DATA });
              cache.writeQuery({
                query: GET_USER_DATA,
                data: {
                  budgets: [...data.budgets, addBudget],
                },
              });
            },
          })
            .then((res) => {
              setVisible(true);
            })
            .catch((err) => {
              setFieldError("amount", err.message);
              setSubmitting(false);
            });
        }}
      >
        {(formikProps) => (
          <View style={styles.formContainer}>
            <Picker
              autoCapitalize="none"
              name="category"
              style={styles.picker}
              onValueChange={formikProps.handleChange("category")}
              selectedValue={formikProps.values.category}
            >
              <Picker.Item label="Food and Drink" value="Food and Drink" />
              <Picker.Item label="Shops" value="Shops" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Recreation" value="Recreation" />
              <Picker.Item label="Transfer" value="Transfer" />
              <Picker.Item label="Payment" value="Payment" />
              <Picker.Item label="Travel" value="Travel" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <TextInput
              keyboardType="numeric"
              name="amount"
              unit="$"
              delimiter=","
              separator="."
              precision={2}
              style={styles.input}
              placeholder="Budget Amount"
              onChangeText={formikProps.handleChange("amount")}
              value={formikProps.values.amount}
              onBlur={formikProps.handleBlur("amount")}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.amount && formikProps.errors.amount}
            </Text>

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
    </View>
  );
}

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
