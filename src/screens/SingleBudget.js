import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import DeleteButton from "../shared/delete";
import SaveButton from "../shared/save";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { Snackbar } from "react-native-paper";
import { UPDATE_AMOUNT, DELETE_BUDGET } from "../queries/budget";
import BudgetRecap from "./BudgetRecap";
import { useIsFocused } from "@react-navigation/native";

const budgetSchema = yup.object({
  amount: yup.number().required(),
});

export default function SingleBudget({ navigation, route }) {
  const [budget, setBudget] = useState(route.params);
  const [updateAmount] = useMutation(UPDATE_AMOUNT);
  const [deleteBudget] = useMutation(DELETE_BUDGET);
  const isFocused = useIsFocused();
  const client = useApolloClient();
  useEffect(() => {}, [isFocused, budget]);

  const BUDGET_CURRENT_AMOUNT = route.params.currentAmount;

  const handleRemoveItem = async (budgetId) => {
    try {
      await deleteBudget({
        variables: { id: budgetId },
        update(cache) {
          cache.modify({
            fields: {
              budgets(existingBudgets, { readField }) {
                return existingBudgets.filter(
                  (budgetRef) => budgetId !== readField("id", budgetRef)
                );
              },
            },
          });
        },
      });
      navigation.goBack();
    } catch (err) {
      throw err;
    }
  };

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.test}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Formik
            initialValues={{
              amount: (route.params.goalAmount / 100).toString() || "0",
            }}
            validationSchema={budgetSchema}
            onSubmit={async (values) => {
              try {
                const { data: budgetData } = await updateAmount({
                  variables: {
                    id: route.params.id,
                    goalAmount: +values.amount,
                  },
                });

                await client.writeFragment({
                  id: `Budget:${budgetData.updateBudget.id}`,
                  fragment: gql`
                    fragment MyBudget on Budget {
                      __typename
                      goalAmount
                    }
                  `,
                  data: {
                    __typename: "Budget",
                    goalAmount: +budgetData.updateBudget.goalAmount,
                  },
                });

                setBudget(budgetData.updateBudget);

                setVisible(true);
              } catch (err) {
                throw err;
              }
            }}
          >
            {(formikProps) => (
              <View style={styles.formikView}>
                <TextInput
                  name="amount"
                  keyboardType="numeric"
                  precision={2}
                  style={styles.input}
                  placeholder="Budget Amount"
                  placeholderTextColor="lightgrey"
                  onChangeText={formikProps.handleChange("amount")}
                  value={formikProps.values.amount}
                  onBlur={formikProps.handleBlur("amount")}
                />
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    {formikProps.touched.amount && formikProps.errors.amount}
                  </Text>
                </View>

                <View style={styles.buttons}>
                  <DeleteButton
                    text="Delete"
                    onPress={() => handleRemoveItem(route.params.id)}
                  />
                  <SaveButton
                    onPress={formikProps.handleSubmit}
                    text="Save Changes"
                  />
                </View>
                <Snackbar
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                  duration={2000}
                  style={styles.snack}
                >
                  Your {route.params.category} budget was updated!
                </Snackbar>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.borderBottom}>
        <Text style={styles.recapHeader}> Your Budget At A Glance</Text>
      </View>
      <BudgetRecap item={budget} currentAmount={BUDGET_CURRENT_AMOUNT} />
    </View>
  );
}

const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: -70,
  },
  test: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },
  formikView: {
    width: "100%",
    height: "90%",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
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
    textAlign: "center",
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
  recapHeader: {
    color: "white",
    fontSize: 20,
  },
  borderBottom: {
    height: 52,
    width: "95%",
    backgroundColor: "#00A86B",
    ...center,
    marginTop: 70,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
