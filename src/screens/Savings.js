import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { client } from '../../App';
import { gql } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';
import SavingsCard from './SavingsCard';

const FETCH_PLAID = gql`
  query FetchPlaid {
    plaid {
      total_transactions
      accounts {
        name
        type
        subtype
        balances
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

export const GET_SAVINGS = gql`
  query Savings {
    allSavings {
      id
      goalAmount
      currentAmount
    }
  }
`;

export default () => {
  const isFocused = useIsFocused();
  const [allSavings, setAllSavings] = useState(null);
  const [account, setAccount] = useState(null);


  //fetching Plaid Data
  useEffect(() => {
    const account = client.readQuery({
      query: FETCH_PLAID,
    });
    // console.log("IN SAVINGS ->>>>>", account.plaid.accounts)
    let savingsAccount = account.plaid.accounts.filter(
      (item) => item.subtype === 'savings'
    );
    // console.log("SAVINGS ACCOUNTS -------->", savingsAccount)
    setAccount(savingsAccount);
  }, []);

  // fetching savings
  useEffect(() => {
    const { allSavings } = client.readQuery({
      query: GET_SAVINGS,
    });
    setAllSavings(allSavings);
    console.log('CHECKING SAVINGS FETCH ---> ', allSavings);
  }, [isFocused]);

  if (!account) {
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
              <Text style={style.savingsHeaderText}>Savings</Text>
            </View>
            <TouchableOpacity>
              <SavingsCard>
                <Text>${account[0].balances.current}</Text>
                <Text>${allSavings.goalAmount / 100}</Text>
              </SavingsCard>
            </TouchableOpacity>
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
