import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import DeleteButton from '../shared/delete';
import SaveButton from '../shared/save';
import { gql, useMutation } from '@apollo/client';
import { Snackbar } from 'react-native-paper';
import { client } from '../../App';
import { UPDATE_AMOUNT, DELETE_BUDGET } from '../queries/budget';
import { GET_BUDGETS } from '../queries/budget';
import BudgetRecap from './BudgetRecap';
import { useIsFocused } from '@react-navigation/native';

const budgetSchema = yup.object({
  amount: yup.number().required(),
});

export default function SingleBudget({ navigation, route }) {
  const [budget, setBudget] = useState(route.params)
  console.log(Object.keys(route));
  console.log('IN SINGLE BUDGET ----->', route.params);
  const [updateAmount] = useMutation(UPDATE_AMOUNT);
  const [deleteBudget] = useMutation(DELETE_BUDGET);
  // const [allBudgets, setAllBudgets] = useState(null);
  const isFocused = useIsFocused();

 useEffect(() => {
   console.log('FIRST RENDER');
   // const { budgets } = client.readQuery({
   //   query: GET_BUDGETS,
   // });

   // setAllBudgets(budgets);
   // console.log("BUDGETS IN SINGLE VIEW", allBudgets )
 }, [isFocused]);

  const handleRemoveItem = async (budgetId) => {
    try {
      await deleteBudget({
        variables: { id: budgetId },
        update(cache) {
          cache.modify({
            fields: {
              budgets(existingBudgets, { readField }) {
                return existingBudgets.filter(
                  (budgetRef) => budgetId !== readField('id', budgetRef)
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
    <View style={styles.container}>
      <Formik
        initialValues={{
          amount: (route.params.goalAmount / 100).toString() || '0',
        }}
        validationSchema={budgetSchema}
        onSubmit={async (values) => {
          //update budget here?
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
                __typename: 'Budget',
                goalAmount: +budgetData.updateBudget.goalAmount,
              },
            });
            console.log("IN SUBMIT ------->", budgetData)
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
              name='amount'
              keyboardType='numeric'
              precision={2}
              style={styles.input}
              placeholder='Budget Amount'
              onChangeText={formikProps.handleChange('amount')}
              value={formikProps.values.amount}
              onBlur={formikProps.handleBlur('amount')}
            />
            <Text>
              {formikProps.touched.amount && formikProps.errors.amount}
            </Text>
            <View style={styles.buttons}>
              <DeleteButton
                text='Delete'
                onPress={() => handleRemoveItem(route.params.id)}
              />
              <SaveButton
                onPress={formikProps.handleSubmit}
                text='Save Changes'
              />
            </View>
            <View style={styles.borderBottom}></View>
            <BudgetRecap item={budget} />
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

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formikView: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  snack: {
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    marginTop: 300,
  },
  borderBottom: {
    height: 2,
    width: '90%',
    backgroundColor: 'lightgrey',
    ...center,
    marginTop: 50,
  },
});
