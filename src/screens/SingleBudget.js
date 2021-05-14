import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import DeleteButton from "../shared/delete";
import SaveButton from "../shared/save";
import { gql, useMutation } from "@apollo/client";
import { Snackbar } from "react-native-paper";

const reviewSchema = yup.object({
  amount: yup.number().required(),
});

const UPDATE_AMOUNT = gql`
  mutation UpdateBudget($goalAmount: Int, $id: ID) {
    updateBudget(goalAmount: $goalAmount, id: $id) {
      id
      goalAmount
      Category
      currentAmount
    }
  }
`;

const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID) {
    deleteBudget(id: $id) {
      goalAmount
      Category
    }
  }
`;
export default function SingleBudget({ navigation, route }) {
  const [updateAmount] = useMutation(UPDATE_AMOUNT);
  const [deleteBudget] = useMutation(DELETE_BUDGET);

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          amount: (route.params.goalAmount / 100).toString() || "0",
        }}
        validationSchema={reviewSchema}
        onSubmit={(values) => {
          setVisible(true);
          //add budget to database and cahce, navigate back to budget
        }}
      >
        {(formikProps) => (
          <View>
            <TextInput
              name="amount"
              keyboardType="numeric"
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
            <View style={styles.buttons}>
              <DeleteButton text="Delete" />
              <SaveButton
                onPress={formikProps.handleSubmit}
                text="Save Changes"
              />
            </View>
          </View>
        )}
      </Formik>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={styles.snack}
      >
        Your {route.params.category} budget was updated!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardArea: {
    width: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 300,
    alignSelf: "center",
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between",
  },
  snack: {
    backgroundColor: "green",
    alignSelf: "flex-start",
    marginTop: 300,
  },
});
