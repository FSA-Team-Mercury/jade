import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
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
      <ScrollView>
        <View>
          <BulletPoint textItem={'Goal'} itemAmount={item.goalAmount / 100} />
          <BulletPoint
            textItem={'Amount spent so far'}
            itemAmount={CURRENT_SPEND}
          />
          <BulletPoint textItem={'Daily Budget'} itemAmount={DAILY_BUDGET} />
          <BulletPoint
            textItem={'Daily Average Spend'}
            itemAmount={DAILY_AVERAGE_SPEND}
          />
          <BulletPoint
            textItem={'Projected Monthly Spending'}
            itemAmount={PROJECTED_MONTHLY_SPEND}
          />
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
