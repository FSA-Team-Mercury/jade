import React from "react";
import { gql } from "@apollo/client";
import { Formik } from "formik";
import CurrencyInput from 'react-native-currency-input'; //this won't allow text to be entered
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

const reviewSchema = yup.object({
  amount: yup.number().required(),
});

//add gql mutation?

export default function AddBudget() {
    const [budget, setBudget] = useState();
    
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Add Budget</Text>

      <Formik
        initialValues={{ category: "", amount: "" }}
        validationSchema={reviewSchema} 
        onSubmit={async (values) => {
          //add budget to database and cahce, navigate back to budget
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
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Bills" value="bills" />
                <Picker.Item label="Entertainment" value="entertainment" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            {/* <Text style={errorText}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text> */}
            <TextInput
              autoCapitalize="none"
              name="amount"
              unit="$"
              delimiter=","
              separator="."
              precision={2}
              style={styles.input}
              placeholder="Budget Amount"
              onChangeText={formikProps.handleChange("amount")}
              value={formikProps.values.amount}
              onBlur={formikProps.handleBlur("category")}
            />
            {/* <Text style={errorText}>
              {formikProps.touched.password && formikProps.errors.password}
            </Text> */}

            <Button text="Submit Budget" onPress={formikProps.handleSubmit} title="Submit" />
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
        padding: 30
    },
});