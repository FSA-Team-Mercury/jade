import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { client } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BudgetChart from "./BudgetChart";
import BudgetCard from "./BudgetCard";
import { FETCH_PLAID } from "../queries/plaid";
import { GET_BUDGETS } from "../queries/budget";
import currentMonth from "../calculations/currentMonth";
import MonthlySpentCalc from  './MonthlySpentCalc'

export default function Budget(props) {
  const isFocused = useIsFocused();
  const [allBudgets, setAllBudgets] = useState(null);

  useEffect(() => {
    const { budgets } = client.readQuery({
      query: GET_BUDGETS,
    });
    const { plaid } = client.readQuery({
      query: FETCH_PLAID,
    });
    //const currBudget = currentMonth(plaid.transactions);
    setAllBudgets(budgets);
  }, [isFocused]);

  if (!allBudgets) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }

  const TODAY = new Date();
  const CURRENT_MONTH = TODAY.toLocaleString('default', { month: 'long' });


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <View style={style.chartContainer}>
            {/* BUDGET CHART */}
            <BudgetChart budgets={allBudgets} />
          </View>

          {/* Budgets List */}

          <View style={style.budgets}>
            <View style={style.budgetsHeader}>
              <Text style={style.budgetHeaderText}>Budget for {CURRENT_MONTH}{' '}</Text>
            </View>
            <FlatList
              data={allBudgets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Single Budget', item)
                  }
                >
                  <BudgetCard item={item}>
                    <View style={style.categoryAndGoal}>
                      <Text
                        style={style.categoryName}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {item.category}
                      </Text>
                      <Text
                        style={style.goalText}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        Goal: ${item.goalAmount / 100}/mo.
                      </Text>
                    </View>
                    <Text style={style.goalTextAmount}>
                      <MonthlySpentCalc item={item} />
                      /${item.goalAmount / 100}
                    </Text>
                  </BudgetCard>
                </TouchableOpacity>
              )}
            />

            {/* buttons */}

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Add Budget")}
            >
              <View style={style.addBudget}>
                <MaterialCommunityIcons
                  name="plus-circle"
                  color={"#00A86B"}
                  size={70}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLING
const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const shadow = {
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 90,
  },
  budgets: {
    width: "95%",
    ...center,
    backgroundColor: "#ededed",
    ...shadow,
  },
  budgetsHeader: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#00A86B",
  },
  budgetHeaderText: {
    fontSize: 22,
    color: 'white',
  },

  categoryAndGoal: {
    height: '42%',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 15,
  },
  goalTextAmount: {
    fontSize: 18,
  },

  addBudget: {
    display: 'flex',
    alignItems: 'center',
  },
  addBudgetText: {
    fontSize: 20,
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
