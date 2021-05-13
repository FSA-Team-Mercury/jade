import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  svg,
} from "victory-native";
import Icon from "react-native-vector-icons/FontAwesome";

const iconNames = {
  shopping: <Icon name="shopping-cart" size={30} color="black" />,
  gas: <Icon name="car" size={30} color="black" />,
  car: <Icon name="car" size={30} color="black" />,
  home: <Icon name="home" size={30} color="black" />,
  entertainment: <Icon name="film" size={30} color="black" />,
  other: <Icon name="money" size={30} color="black" />,
};

const seedData = [
  {
    companyName: "mcDonald's",
    catagory: "food",
    datePurchased: "May 09, 2021",
    price: "$10.99",
  },
  {
    companyName: "mcDonald's",
    catagory: "Entertainment",
    datePurchased: "May 09, 2021",
    price: "$10.99",
  },
  {
    companyName: "mcDonald's",
    catagory: "food",
    datePurchased: "May 09, 2021",
    price: "$10.99",
  },
  {
    companyName: "mcDonald's",
    catagory: "food",
    datePurchased: "May 09, 2021",
    price: "$10.99",
  },
  {
    companyName: "mcDonald's",
    catagory: "food",
    datePurchased: "May 09, 2021",
    price: "$10.99",
  },
];

const chartData = [
  { x: "Groceries", y: 315 },
  { x: "Entmt", y: 40 },
  { x: "Utilities", y: 55 },
  { x: "Other", y: 10 },
];

export default function Dashboard() {
  const navigation = useNavigation();
  function seeAllTransaction() {
    navigation.navigate("All Transactions");
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.dashBoard}>
        {/* <Text style={styles.welcomeTitle}>Dashboard Summary</Text> */}
        <View style={styles.graphContainer}>
          <View styles={styles.pieChart}>
            <VictoryPie
              data={chartData}
              innerRadius={80}
              padAngle={({ datum }) => 1}
              theme={VictoryTheme.material}
              width={390}
              // height={500}
              style={{
                labels: {
                  fill: "black",
                },
                parent: {
                  marginTop: "8%",
                  marginLeft: "7%",
                },
              }}
            ></VictoryPie>
          </View>
        </View>
        <View style={styles.transactions}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.recentTransactions}>Recent Transactions</Text>
            <Text style={styles.seeAll} onPress={seeAllTransaction}>
              See All
            </Text>
          </View>
          {seedData.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.singleTransaction}>
                  {/* catigory picture (entertainment, food, shoping...) */}
                  <View style={styles.catagoryPic}>
                    {/* <Icon name="shopping-cart" size={30} color="#900" /> */}
                    {iconNames.other}
                  </View>
                  {/* componay name and catagory on the bottom */}
                  <View style={styles.nameAndCategory}>
                    <Text
                      style={styles.companyName}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {item.companyName}{" "}
                    </Text>
                    <Text
                      style={styles.purchaseCategory}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {item.catagory}
                    </Text>
                  </View>
                  {/* price and when it was bought on the bottom */}
                  <View style={styles.priceAndDate}>
                    <Text
                      style={styles.price}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {item.price}{" "}
                    </Text>
                    <Text
                      style={styles.date}
                      ellipsizeMode="tail"
                      numberOfLines={2}
                    >
                      {item.datePurchased}
                    </Text>
                  </View>
                </View>
                <View style={styles.borderBottom}></View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const center = {
  marginRight: "auto",
  marginLeft: "auto",
};

const colors = {
  primary: "black",
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
  dashBoard: {
    height: "100%",
    width: "100%",
    // backgroundColor: '#adffe1',
    backgroundColor: "white",
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
    height: 500,
    width: "100%",
    backgroundColor: "yellow",
  },
  transactions: {
    width: "95%",
    ...center,
    backgroundColor: "lightgrey",
    marginBottom: 10,
    ...shadow,
  },
  transactionsHeader: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#00A86B",
  },
  recentTransactions: {
    fontSize: 18,
  },
  seeAll: {
    fontSize: 18,
  },
  singleTransaction: {
    height: 100,
    width: "98%",
    backgroundColor: "lightgrey",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    ...center,
  },
  catagoryPic: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "#00A86B",
    marginLeft: 10,
    marginRight: 10,
  },
  nameAndCategory: {
    height: "42%",
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
  },
  companyName: {
    fontSize: 16,
    height: 16,
    color: colors.primary,
  },
  purchaseCategory: {
    fontSize: 14,
    height: 14,
    color: "#585252",
  },
  priceAndDate: {
    height: "42%",
    flex: 1,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
    // backgroundColor:'red',
    marginLeft: "auto",
  },
  price: {
    fontSize: 16,
    marginLeft: "auto",
  },
  date: {
    marginLeft: "auto",
    color: "#585252",
  },
  borderBottom: {
    height: 2,
    width: "90%",
    backgroundColor: "lightgrey",
    ...center,
  },
});
