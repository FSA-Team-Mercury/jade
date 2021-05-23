import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import createBudgetBars from "../calculations/budgetChart";

export default function BudgetChart({ budgets }) {
  const isFocused = useIsFocused();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const budgetBars = createBudgetBars(budgets);
    setChartData(budgetBars);
    setLoading(false);
  }, [isFocused, budgets]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", paddingTop: 160 }}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <VictoryChart
      domainPadding={40}
      theme={VictoryTheme.material}
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryLegend
        x={230}
        y={30}
        title="Chart Legend"
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 10 } }}
        data={[
          { name: "Current", symbol: { fill: "tomato" } },
          { name: "Goal", symbol: { fill: "#00A86B" } },
        ]}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            fontSize: 8,
            angle: 10,
            width: 10,
          },
        }}
      />
      <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
      <VictoryGroup offset={12} colorScale={["#00A86B", "tomato"]}>
        <VictoryBar
          padding={{ left: 20, right: 80 }}
          cornerRadius={6}
          labelComponent={<VictoryTooltip pointerLength={20} />}
          labels={({ datum }) => Math.round(datum.y)}
          data={chartData.goalAmount}
          animate={{
            onLoad: {
              duration: 1000,
            },
          }}
        />
        <VictoryBar
          labelComponent={<VictoryTooltip constrainToVisibleArea />}
          labels={({ datum }) => Math.round(datum.y)}
          padding={{ left: 20, right: 60 }}
          cornerRadius={6}
          data={chartData.currentAmount}
          animate={{
            onLoad: {
              duration: 1000,
            },
          }}
        />
      </VictoryGroup>
    </VictoryChart>
  );
}
