import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory-native";

const data2012 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
];

const data2013 = [
  { quarter: 1, earnings: 15000 },
  { quarter: 2, earnings: 12500 },
];

export default function BudgetChart() {
  return (
    <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
      <VictoryAxis tickValues={[1, 2]} tickFormat={["Groceries", "Other"]} />
      <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
      <VictoryStack
        colorScale={["green", "lightgreen"]}
        domain={{ y: [0, 30000] }}
        domainPadding={{ x: [10, 10], y: 5 }}
      >
        <VictoryBar data={data2012} x="quarter" y="earnings" />
        <VictoryBar data={data2013} x="quarter" y="earnings" />
      </VictoryStack>
    </VictoryChart>
  );
}
