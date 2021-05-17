import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { client } from '../../App';
import { gql } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import BudgetChart from './BudgetChart';
import BudgetCard from './BudgetCard';
import {GET_USER_DATA} from './home'

const FETCH_PLAID = gql`
  query FetchPlaid {
    plaid {
      total_transactions
      accounts {
        name
        type
      }
      transactions {
        account_id
        amount
        date
        category
        pending
        merchant_name
      }
    }
  }
`;

export const GET_BUDGETS = gql`
  query Budgets {
    budgets {
      id
      category
      goalAmount
      currentAmount
    }
  }
`;
const init = {
  Travel: 0,
  'Food and Drink': 0,
  Entertainment: 0,
  Recreation: 0,
  Payment: 0,
  Shops: 0,
  Transfer: 0, // there are both negative and pos
  Other: 0,
};

//monthly spending
const getGraphData = (data) => {
  const categories = Object.keys(init);
  const graphData = data.reduce((accum, transaction) => {
    const curCategory = transaction.category[0];
    if (categories.includes(curCategory)) {
      accum[curCategory] += transaction.amount;
    } else {
      accum.Other += transaction.amount;
    }
    return accum;
  }, init);
  return graphData;
};

export default () => {
  const isFocused = useIsFocused();
  const [allBudgets, setAllBudgets] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [graphData, setGraphData] = useState({});

  //fetching Plaid Data
  useEffect(() => {
    const account = client.readQuery({
      query: FETCH_PLAID,
    });
    console.log("IN SAVINGS ->>>>>", account)
    let transactions = account.plaid.transactions;
    setTransactions(transactions || [{}]);
    // console.log('SAVINGS ---> ', transactions);
    const data = getGraphData(transactions);
    setGraphData(data);
    // console.log('GRAPH DATA ---->', data);
  }, []);

  // fetching budgets to measure savings
  // fetching savings?
  // savings measured from month before?
  useEffect(() => {
    const { budgets } = client.readQuery({
      query: GET_BUDGETS,
    });
    setAllBudgets(budgets);
  }, [isFocused]);

  // useEffect(() => {
  //   const response = client.readQuery({
  //     query: GET_USER_DATA,
  //   });
  //   console.log('RESPONSE ------->', response.user.accounts)
  // }, []);

  if (!transactions) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <View style={style.chartContainer}>
            {/* BUDGET CHART */}
            {/* <BudgetChart /> */}
          </View>

          {/* Budgets List */}
          <View style={style.savings}>
            <View style={style.savingsHeader}>
              <Text style={style.savingsHeaderText}>Savings This Month</Text>
            </View>
            <FlatList
              data={allBudgets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <BudgetCard item={item}>
                  <Text style={style.categoryName}>{item.category}</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color:
                        item.goalAmount / 100 - graphData[item.category] > 0
                          ? 'green'
                          : 'red',
                    }}
                  >
                    $
                    {item.goalAmount / 100 -
                      graphData[item.category].toFixed(2)}
                  </Text>
                </BudgetCard>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// STYLING
const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const shadow = {
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 90,
  },
  savings: {
    width: '95%',
    ...center,
    backgroundColor: '#ededed',
    ...shadow,
  },
  savingsHeader: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00A86B',
  },
  savingsHeaderText: {
    fontSize: 22,
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 20,
  },

  // CHART STYLES
  chartContainer: {
    height: 320,
    width: '95%',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});
