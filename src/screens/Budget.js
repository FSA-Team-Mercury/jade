import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { client } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BudgetChart from "./BudgetChart";

export default function Budget(props) {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* BUDGET CHART */}
        <BudgetChart />
      </View>

      <View>
        {/* lower components */}
        <Text>Budget Screen</Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Single Budget")}
          >
            <View>
              <Text>Single Budget</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={"#00A86B"}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Add Budget")}
          >
            <View>
              <Text>Add Budget</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={"#00A86B"}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 90,
  },
  chartContainer: {
    height: 320,
    width: "95%",
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});
