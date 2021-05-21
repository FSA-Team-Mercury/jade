import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BulletPoint from './BulletPoint';
import { CURRENT_DAY, NUM_DAYS_MONTH } from './MonthlySpentCalc';

export default ({ item, currentAmount }) => {


  const DAILY_BUDGET = parseInt(item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2);

  const DAILY_AVERAGE_SPEND = parseInt(
    currentAmount / 100 / CURRENT_DAY
  ).toFixed(2);

  const CURRENT_SPEND = parseInt(currentAmount / 100).toFixed(2);

  const PROJECTED_MONTHLY_SPEND = parseInt(
    DAILY_AVERAGE_SPEND * NUM_DAYS_MONTH
  ).toFixed(2);

  const PROJECTED_MONTHLY_SAVINGS = parseInt(
    item.goalAmount / 100 - PROJECTED_MONTHLY_SPEND
  ).toFixed(2);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <BulletPoint textItem={'Goal'} itemAmount={parseInt(item.goalAmount / 100).toFixed(2)} />
          <View style={styles.borderBottom}></View>
          <BulletPoint
            textItem={'Amount spent so far'}
            itemAmount={CURRENT_SPEND}
          />
          <View style={styles.borderBottom}></View>
          <BulletPoint textItem={'Daily Budget'} itemAmount={DAILY_BUDGET} />
          <View style={styles.borderBottom}></View>
          <BulletPoint
            textItem={'Daily Average Spend'}
            itemAmount={DAILY_AVERAGE_SPEND}
          />
          <View style={styles.borderBottom}></View>
          <BulletPoint
            textItem={'Projected Monthly Spending'}
            itemAmount={PROJECTED_MONTHLY_SPEND}
          />
          <View style={styles.borderBottom}></View>
          <BulletPoint
            textItem={'Projected Monthly Savings'}
            itemAmount={PROJECTED_MONTHLY_SAVINGS}
            colorText={PROJECTED_MONTHLY_SAVINGS <= 0 ? 'red' : 'green'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const shadow = {
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};
const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const styles = StyleSheet.create({
  container: {
    height: 450,
    marginHorizontal: 11,
    ...shadow,
    backgroundColor: 'white'
  },
  borderBottom: {
    height: 2,
    width: '90%',
    backgroundColor: 'lightgrey',
    ...center,
  },
});
