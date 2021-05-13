import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { client } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { gql } from "@apollo/client";
import BudgetChart from "./BudgetChart";
const GET_USER = gql`
  query GetUser {
    user {
      budgets {
        category
        goalAmount
        isCompleted
      }
    }
  }
`;

export default function Budget(props) {
  const [allBudgets, setAllBudgets] = useState(null);

  useEffect(() => {
    const { user } = client.readQuery({
      query: GET_USER,
    });
    setAllBudgets(user.budgets);
    console.log("In BUDGET", user.budgets);
  }, []);

  console.log(allBudgets);

  if (!allBudgets) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.chartContainer}>
        {/* BUDGET CHART */}
        <BudgetChart />
      </View>

      <View>
        <SafeAreaView>
          <ScrollView>
            <View style={style.budgets}>
              <View style={style.budgetsHeader}>
                <Text style={style.budgetHeaderText}>Budgets</Text>
              </View>
              {allBudgets.map((budget, idx) => {
                return (
                  <View key={idx}>
                    <View style={style.singleBudget}>
                      {/* budget name */}
                      <View style={style.budgetCategory}>
                        <Text
                          style={style.companyName}
                          ellipsizeMode="tail"
                          numberOfLines={2}
                        >
                          {item.companyName}{" "}
                        </Text>
                        <Text
                          style={style.purchaseCategory}
                          ellipsizeMode="tail"
                          numberOfLines={2}
                        >
                          {item.catagory}
                        </Text>
                      </View>
                      {/* price and when it was bought on the bottom */}
                      <View style={style.priceAndDate}>
                        <Text
                          style={style.price}
                          ellipsizeMode="tail"
                          numberOfLines={2}
                        >
                          {item.price}{" "}
                        </Text>
                        <Text
                          style={style.date}
                          ellipsizeMode="tail"
                          numberOfLines={2}
                        >
                          {item.datePurchased}
                        </Text>
                      </View>
                    </View>
                    <View style={style.borderBottom}></View>
                  </View>
                );
              })}
            </View>
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
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

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
    backgroundColor: "lightgrey",
    marginBottom: 10,
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
    fontsize: 18,
  },
  singleBudget: {
    height: 100,
    width: "98%",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...center,
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
