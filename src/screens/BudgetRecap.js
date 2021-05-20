import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import BulletPoint from './BulletPoint';
import { GRAPH_DATA } from './Budget';
import { CURRENT_DAY, NUM_DAYS_MONTH } from './MonthlySpentCalc';

export default ({ item }) => {
  const DAILY_BUDGET = parseInt(
    (item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2)
  );

  const DAILY_AVERAGE_SPEND = parseInt(
    (GRAPH_DATA[item.category] / CURRENT_DAY).toFixed(2)
  );

  const CURRENT_SPEND = parseInt(GRAPH_DATA[item.category].toFixed(0));

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
          <BulletPoint textItem={'Goal'} itemAmount={item.goalAmount / 100} />
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

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  borderBottom: {
    height: 5,
    width: '100%',
    backgroundColor: 'green',
    ...center,
    marginTop: 0,
  },
});
