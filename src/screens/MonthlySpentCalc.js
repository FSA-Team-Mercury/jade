import React from 'react';
import { Text } from 'react-native';

const TODAY = new Date();
export const CURRENT_DAY = new Date().getDate();
export const NUM_DAYS_MONTH = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth() + 1,
  0
).getDate();

export const CurrentSpend = ({ item }) => {
  
  const DAILY_BUDGET = parseInt(
    ((item.goalAmount / 100 )/ NUM_DAYS_MONTH).toFixed(2)
  );

  const DAILY_AVERAGE_SPEND = parseInt(
    ((item.currentAmount / 100 )/ CURRENT_DAY).toFixed(2)
  );

  const CURRENT_SPEND = parseInt((item.currentAmount / 100).toFixed(2));

  return (
    <Text
      style={{ color: DAILY_AVERAGE_SPEND > DAILY_BUDGET ? 'red' : 'green' }}
    >
      ${CURRENT_SPEND}
    </Text>
  );
};
