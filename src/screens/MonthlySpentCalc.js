import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { client } from '../../App';
import {FETCH_PLAID} from '../queries/plaid'



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
const CURRENT_DAY = new Date().getDate();
const NUM_DAYS_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth() + 1,
  0
).getDate();

let DAILY_BUDGET;
export let DAILY_AVERAGE_SPEND;
export let CURRENT_SPEND;
export let PROJECTED_MONTHLY_SPEND;


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

  console.log('IN MONTHLY SPENT', graphData)


  if (!transactions) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }

   DAILY_BUDGET = parseInt(
    (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
  );
   DAILY_AVERAGE_SPEND = parseInt(
    (graphData[item.category] / CURRENT_DAY).toFixed(2)
  );

    CURRENT_SPEND = parseInt(graphData[item.category].toFixed(0));

    PROJECTED_MONTHLY_SPEND = parseInt(
    DAILY_AVERAGE_SPEND * NUM_DAYS_MONTH
  ).toFixed(2);

  return (
    <Text
      style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green'}}
    >
      ${CURRENT_SPEND}
    </Text>
  );
};
