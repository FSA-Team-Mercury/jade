import React from "react";
import { gql } from "@apollo/client";
import { Formik } from "formik";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Button,
    TextInput,
    Image as Img,
  } from "react-native";

//add gql query

export default function AddBudget() {
  return (
    <View style={styles.container}>
      <Text style={s}>Add Budget</Text>

      <Formik
        initialValues={{ category: "", amount: "" }}
        // validationSchema={reviewSchema} //what is this?
        onSubmit={async (values) => {
          //add budget to database and cahce, navigate back to budget
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              autoCapitalize="none"
              name="category"
              style={styles.input}
              placeholder="Budget Category"
              onChangeText={formikProps.handleChange("category")}
              value={formikProps.values.category}
              onBlur={formikProps.handleBlur("category")}
            />
            {/* <Text style={errorText}>
              {formikProps.touched.username && formikProps.errors.username}
            </Text> */}
            <TextInput
              autoCapitalize="none"
              name="amount"
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
    //   alignItems: "center",
    //   justifyContent: "center",
    //   marginTop: 200,
      paddingTop: 300,
      padding: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    titleText: {
        fontFamily: "nunito-bold",
        fontSize: 18,
        color: "#333",
    },
});