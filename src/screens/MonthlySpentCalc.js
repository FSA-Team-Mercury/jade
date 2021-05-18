import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { client } from '../../App';
import { gql } from '@apollo/client';

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

const TODAY = new Date();
const CURRENT_DAY = new Date().getDate(); //18
const NUM_DAYS_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth() + 1,
  0
).getDate(); //31

export default ({ item }) => {
  const [transactions, setTransactions] = useState(null);
  const [graphData, setGraphData] = useState({});

  //fetching Plaid transactions from beginning of month
  useEffect(() => {
    const account = client.readQuery({
      query: FETCH_PLAID,
    });

    let transactions = account.plaid.transactions;
    setTransactions(transactions || [{}]);

    const data = getGraphData(transactions);

    setGraphData(data);
  }, []);

  if (!transactions) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }

  const DAILY_BUDGET = parseInt(
    (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
  );
  const DAILY_AVERAGE_SPEND = parseInt(
    (graphData[item.category] / CURRENT_DAY).toFixed(2)
  );

  const CURRENT_SPEND = parseInt(graphData[item.category].toFixed(0));

  const PROJECTED_MONTHLY_SPEND = parseInt(
    DAILY_AVERAGE_SPEND * NUM_DAYS_MONTH
  ).toFixed(2);
  const PROJECTED_MONTHLY_SAVINGS = parseInt(
    item.goalAmount / 100 - PROJECTED_MONTHLY_SPEND
  );

  return (
    <Text
      style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green'}}
    >
      ${CURRENT_SPEND}
    </Text>
  );
};
