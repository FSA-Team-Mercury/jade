import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BulletPoint from './BulletPoint'
import {DAILY_BUDGET,
DAILY_AVERAGE_SPEND,
 CURRENT_SPEND,
 PROJECTED_MONTHLY_SPEND,
 PROJECTED_MONTHLY_SAVINGS} from './MonthlySpentCalc'

export default ({ item }) => {
  const TODAY = new Date();
  const CURRENT_DAY = new Date().getDate(); //18
  const NUM_DAYS_MONTH = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth() + 1,
    0
  ).getDate(); //31
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};;


