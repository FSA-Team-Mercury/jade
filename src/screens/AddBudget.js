import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import CurrencyInput from "react-native-currency-input"; //this won't allow text to be entered
// import Picker from "@react-native-picker/picker"; //Picker is depracated from react-native, this one works but throws a warning
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TextInput,
  Picker, //depracated, but works better than the alternative
  Image as Img,
} from "react-native";
import * as yup from "yup";
import {GET_USER_DATA} from './home'

const reviewSchema = yup.object({
  amount: yup.number().required(),
});

const ADD_BUGDET = gql`
  mutation AddBudget($category: String, $goalAmount: Int, $currentAmount: Int) {
    addBudget(
      category: $category
      goalAmount: $goalAmount
      currentAmount: $currentAmount
    ) {
      id
      category
      goalAmount
      currentAmount
    }
  }
`;


export default function AddBudget({ navigation }) {
  const [addBudget] = useMutation(ADD_BUGDET);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Add Budget</Text>

      <Formik
        initialValues={{ category: "", amount: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          addBudget({
            variables: {
              category: values.category,
              goalAmount: +values.amount,
              currentAmount: 5,
            },
            update: (cache, {data:{addBudget}}) => {
              const data = cache.readQuery({ query: GET_USER_DATA });
              console.log("IN THE UPDATE/CACHE DATA", data)
              console.log('IN THE UPDATE/CACHE BUDGETS', data.budgets);
              console.log("ADDED BUDGET", addBudget)

              cache.writeQuery({
                query: GET_USER_DATA,
                data: {
                  budgets: [...data.budgets, addBudget],
                },
              });
              console.log('LOGGING', data.budgets);
            }
          })
            .then((res) => {
              navigation.navigate("Budget");
              console.log(res);
            })
            .catch((error) => {
              setError(true);
              console.log(error);
            });
        }}
      >
        {(formikProps) => (
          <View>
            <Picker
              autoCapitalize="none"
              name="category"
              style={styles.picker}
              //   placeholder="Budget Category"
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
            <Text>
              {formikProps.touched.amount && formikProps.errors.amount}
            </Text>
            <Text>{"You already have a budget for this" && error}</Text>

            <Button
              text="Submit Budget"
              onPress={formikProps.handleSubmit}
              title="Submit"
            />
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
    //   paddingTop: 200,
    //   padding: 40,
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
    // fontFamily: "",
    fontSize: 30,
    color: "#333",
    padding: 30,
  },
});
