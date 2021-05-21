import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { client } from '../../App';
import { FETCH_PLAID, TRANSACTIONS } from '../queries/plaid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BudgetChart from './BudgetChart';
import BudgetCard from './BudgetCard';
import { GET_BUDGETS } from '../queries/budget';
import getGraphData, { CurrentSpend } from './MonthlySpentCalc';
import currentMonth from '../calculations/currentMonth';


export let GRAPH_DATA;
const TODAY = new Date();
const CURRENT_MONTH = TODAY.toLocaleString('default', { month: 'long' })

export default function Budget(props) {
  const isFocused = useIsFocused();
  const [allBudgets, setAllBudgets] = useState(null);
  // const [transactions, setTransactions] = useState(null);
  // const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const { budgets } = client.readQuery({
      query: GET_BUDGETS,
    });

    setAllBudgets(budgets);
  }, [isFocused]);


  if (!allBudgets) {
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
            <BudgetChart budgets={allBudgets} />
          </View>

          {/* BUDGET LIST*/}
          <View style={style.budgets}>
            <View style={style.budgetsHeader}>
              <Text style={style.budgetHeaderText}>
                Budget for {CURRENT_MONTH}{' '}
              </Text>
            </View>
            <FlatList
              data={allBudgets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Single Budget', item)
                  }
                >
                  <BudgetCard item={item}>
                    <View style={style.categoryAndGoal}>
                      <Text
                        style={style.categoryName}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {item.category}
                      </Text>
                      <Text
                        style={style.goalText}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        Goal: ${item.goalAmount / 100}/mo.
                      </Text>
                    </View>
                    <Text style={style.goalTextAmount}>
                      <CurrentSpend item={item} />
                      /${item.goalAmount / 100}
                    </Text>
                  </BudgetCard>
                </TouchableOpacity>
              )}
            />
            {/* ADD BUDGET BUTTON */}
            <TouchableOpacity
              style={style.addButtonContainer}
              onPress={() => props.navigation.navigate('Add Budget')}
            >
              <View>
                {allBudgets.length >= 6 ? (
                  <View></View>
                ) : (
                  <View style={style.addBudget}>
                    <MaterialCommunityIcons
                      name='plus-circle'
                      color={'#00A86B'}
                      size={60}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginTop: 20,
  },
  budgets: {
    width: '95%',
    ...center,
    ...shadow,
  },
  budgetsHeader: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00A86B',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  budgetHeaderText: {
    fontSize: 22,
    color: 'white',
  },

  categoryAndGoal: {
    height: '42%',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 15,
  },
  goalTextAmount: {
    fontSize: 18,
  },

  addBudget: {
    display: 'flex',
    alignItems: 'center',
  },
  addBudgetText: {
    fontSize: 20,
  },
  addButtonContainer: {
    marginHorizontal: 160,
    borderRadius: 100,
  },
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
