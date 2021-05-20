// import React from 'react';
// import { Text } from 'react-native';

// const TODAY = new Date();
// export const CURRENT_DAY = new Date().getDate();
// export const NUM_DAYS_MONTH = new Date(
//   TODAY.getFullYear(),
//   TODAY.getMonth() + 1,
//   0
// ).getDate();

// let GRAPH_DATA;

// const init = {
//   Travel: 0,
//   "Food and Drink": 0,
//   Entertainment: 0,
//   Recreation: 0,
//   Payment: 0,
//   Shops: 0,
//   Other: 0,
// };

// //monthly spending
// export default getGraphData = (data) => {
//   const categories = Object.keys(init);
//   const graphData = data.reduce((accum, transaction) => {
//     const curCategory = transaction.category[0];
//     if (categories.includes(curCategory)) {
//       accum[curCategory] += transaction.amount;
//     } else {
//       accum.Other += transaction.amount;
//     }
//     return accum;
//   }, init);

//   GRAPH_DATA = graphData;
//   return graphData;
// };

export const CurrentSpend = ({ item }) => {
  const DAILY_BUDGET = parseInt(
    (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
  );

  const DAILY_AVERAGE_SPEND = parseInt(
    (GRAPH_DATA[item.category] / CURRENT_DAY).toFixed(2)
  );

  const CURRENT_SPEND = parseInt(GRAPH_DATA[item.category].toFixed(0));

  return (
    <Text
      style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green' }}
    >
      ${CURRENT_SPEND / 100}
    </Text>
  );
};
