import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VictoryPie, VictoryTheme } from "victory-native";
import { useApolloClient } from "@apollo/client";
import SingleTransaction from "./SingleTransaction";
import { TRANSACTIONS } from "../queries/plaid";

const getGraphData = (data) => {
  const init = {
    "Food and Drink": 0,
    Travel: 0,
    Payment: 0,
    Shops: 0,
    Other: 0,
  };

  const categories = Object.keys(init);
  const graphData = data.reduce((accum, transaction) => {
    const curCategory = transaction.category[0];
    if (categories.includes(curCategory)) {
      accum[curCategory] += transaction.amount;
    } else {
      accum.Other += transaction.amount;
    }
    return accum;
  }, init);
  return graphData;
};

export default function Dashboard() {
  const client = useApolloClient();
  const navigation = useNavigation();
  function seeAllTransaction() {
    navigation.navigate("All Transactions", {
      transactions,
    });
  }

  const [transactions, setTransactions] = useState(null);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const account = client.readQuery({
      query: TRANSACTIONS,
    });
    console.log(account);
    let transactions = account.plaid.transactions;
    setTransactions(transactions || [{}]);
    const data = getGraphData(transactions);
    const reordered = Object.keys(data).map((key) => {
      return {
        x: key,
        y: data[key],
      };
    });
    setGraphData(reordered);
  }, []);
  if (!transactions) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.dashBoard}>
        <View style={styles.graphContainer}>
          <VictoryPie
            data={graphData}
            innerRadius={75}
            labelRadius={125}
            padding={{ top: 60, bottom: 60, left: 60, right: 60 }}
            animate={{
              duration: 1000,
              onLoad: {
                duration: 1500,
                before: () => ({ _y: -1500, label: " " }),
                after: (datum) => ({ _y: datum._y }),
              },
            }}
            padAngle={({ datum }) => 1}
            theme={VictoryTheme.material}
            width={350}
            style={{
              labels: {
                fill: "black",
                fontSize: 11,
              },
              parent: {
                marginTop: "6%",
                marginLeft: "-10%",
              },
            }}
          ></VictoryPie>
        </View>
        <View style={styles.transactions}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.recentTransactions}>Recent Transactions</Text>
            <Text style={styles.seeAll} onPress={seeAllTransaction}>
              See All
            </Text>
          </View>
          <FlatList
            data={transactions.slice(0, 5)}
            keyExtractor={(item) => item.transaction_id}
            renderItem={(props) => {
              return (
                <View>
                  <SingleTransaction {...props} />
                </View>
              );
            }}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  dashBoard: {
    height: "100%",
    width: "100%",
    overflow: "scroll",
  },
  transactionContainer: {
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  graphContainer: {
    height: 350,
    width: "95%",
    backgroundColor: "white",
    ...center,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...shadow,
  },
  pieChart: {
    height: 600,
  },
  transactions: {
    width: "95%",
    ...center,
    backgroundColor: "white",
    marginBottom: 10,
    ...shadow,
  },
  transactionsHeader: {
    height: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#00A86B",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  recentTransactions: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },
  seeAll: {
    fontSize: 18,
    marginRight: 15,
    color: "white",
  },
});
