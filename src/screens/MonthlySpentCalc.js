import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { client } from '../../App';
import { FETCH_PLAID } from '../queries/plaid';
import currentMonth from '../calculations/currentMonth';
import { useIsFocused } from '@react-navigation/native';

const TODAY = new Date();
export const CURRENT_DAY = new Date().getDate();
export const NUM_DAYS_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth() + 1,
  0
).getDate();

let GRAPH_DATA;

const init = {
  Travel: 0,
  'Food and Drink': 0,
  Entertainment: 0,
  Recreation: 0,
  Payment: 0,
  Shops: 0,
  Other: 0,
};

//monthly spending
export default getGraphData = (data) => {
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

  GRAPH_DATA = graphData
  return graphData;
};




export const CurrentSpend = ({item}) => {

  const DAILY_BUDGET = parseInt(
    (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
  );
  console.log('DAILY BUDGET', DAILY_BUDGET);

  const DAILY_AVERAGE_SPEND = parseInt(
    (GRAPH_DATA[item.category] / CURRENT_DAY).toFixed(2)
  );
  console.log('DAILY_AVERAGE_SPEND', DAILY_AVERAGE_SPEND);

  const CURRENT_SPEND = parseInt(GRAPH_DATA[item.category].toFixed(0));
  console.log('CURRENT_SPEND', CURRENT_SPEND);


  return (
    <Text
      style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green' }}
    >
      ${CURRENT_SPEND}
    </Text>
  );
}

// export default ({ item }) => {
//   console.log('-------------ENTERING IN MONTH SPENT ---------------', item);
//   const isFocused = useIsFocused();
//   const [transactions, setTransactions] = useState(null);
//   const [graphData, setGraphData] = useState(null);

//   //fetching Plaid transactions from beginning of month
//   useEffect(() => {
//     const { plaid } = client.readQuery({
//       query: FETCH_PLAID,
//     });

//     let currMonthlytransactions = currentMonth(plaid.transactions);
//     setTransactions(currMonthlytransactions || [{}]);

//     const data = getGraphData(currMonthlytransactions);

//     setGraphData(data);

//     GRAPH_DATA = graphData;
//   }, [isFocused, graphData]);

//   console.log('IN MONTHLY SPENT GRAPH_DATA ------------>', GRAPH_DATA);


//   if (!transactions) {
//     return (
//       <View>
//         <ActivityIndicator size='large' color='#00A86B' />
//       </View>
//     );
//   }

//   const DAILY_BUDGET = parseInt(
//     (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
//   );
//   console.log('DAILY BUDGET', DAILY_BUDGET);

//   const DAILY_AVERAGE_SPEND = parseInt(
//     (graphData[item.category] / CURRENT_DAY).toFixed(2)
//   );
//   console.log('DAILY_AVERAGE_SPEND', DAILY_AVERAGE_SPEND);

//   const CURRENT_SPEND = parseInt(graphData[item.category].toFixed(0));
//   console.log('CURRENT_SPEND', CURRENT_SPEND);

//   return (
//     <Text
//       style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green' }}
//     >
//       ${CURRENT_SPEND}
//     </Text>
//   );
// };
