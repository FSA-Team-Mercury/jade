import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
} from "victory-native";
import createBudgetBars from "../calculations/budgetChart";

export default function BudgetChart({ budgets }) {
  const isFocused = useIsFocused();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const budgetBars = createBudgetBars(budgets);
    setChartData(budgetBars);
  }, [isFocused, budgets]);

  if (!chartData) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
      <VictoryLegend
        x={230}
        y={30}
        title="Chart Legend"
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 10 } }}
        data={[
          { name: "Current", symbol: { fill: "#00A86B" } },
          { name: "Goal", symbol: { fill: "#fffb85" } },
        ]}
      />
      <VictoryAxis
        tickValues={chartData.axisPoints}
        tickFormat={chartData.categories}
        style={{
          tickLabels: {
            fontSize: 8,
            angle: 10,
            width: 10,
          },
        }}
      />
      <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 100}`} />
      <VictoryStack
        colorScale={["#00A86B", "#fffb85"]}
        domain={{
          y: [0, 40000],
          x: [0, chartData.categories ? chartData.categories.length + 1 : 1],
        }}
        domainPadding={{ x: 0, y: 10 }}
      >
        <VictoryBar
          data={chartData.goalAmount}
          x="category"
          y="amount"
          animate={{
            duration: 10,
          }}
        />
        <VictoryBar
          data={chartData.currentAmount}
          x="category"
          y="amount"
          animate={{
            duration: 10,
          }}
        />
      </VictoryStack>
    </VictoryChart>
  );
}
