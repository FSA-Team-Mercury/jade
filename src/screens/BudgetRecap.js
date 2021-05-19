import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import BulletPoint from './BulletPoint'
import {
DAILY_AVERAGE_SPEND,
 CURRENT_SPEND,
 PROJECTED_MONTHLY_SPEND,
 } from './MonthlySpentCalc'
 import { useIsFocused } from '@react-navigation/native';

let PROJECTED_MONTHLY_SAVINGS;

export default ({ item }) => {
  const isFocused = useIsFocused();


  useEffect(() => {
    return () => {
    };
  }, [item, isFocused]);

  const TODAY = new Date();
  const NUM_DAYS_MONTH = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth() + 1,
    0
  ).getDate();

  const DAILY_BUDGET_WITH_UPDATE = parseInt((item.goalAmount / 100 / NUM_DAYS_MONTH).toFixed(2));

  PROJECTED_MONTHLY_SAVINGS = parseInt(
    item.goalAmount / 100 - PROJECTED_MONTHLY_SPEND
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <BulletPoint textItem={'Goal'} itemAmount={item.goalAmount / 100} />
          <BulletPoint
            textItem={'Amount spent so far'}
            itemAmount={CURRENT_SPEND}
          />
          <BulletPoint
            textItem={'Daily Budget'}
            itemAmount={DAILY_BUDGET_WITH_UPDATE}
          />
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
};;;


