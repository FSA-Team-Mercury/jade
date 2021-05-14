import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { client } from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { gql } from '@apollo/client';
import BudgetChart from './BudgetChart';
import BudgetCard from './BudgetCard';

const GET_USER = gql`
  query GetUser {
    user {
      budgets {
        id
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
  }, []);

  if (!allBudgets) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.chartContainer}>
        {/* BUDGET CHART */}
        <BudgetChart />
      </View>
      {/* Budgets List */}
      <View>
        <SafeAreaView>
          <ScrollView>
            <View style={style.budgets}>
              <View style={style.budgetsHeader}>
                <Text style={style.budgetHeaderText}>Budgets</Text>
              </View>
              <FlatList
                data={allBudgets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Single Budget')}
                  >
                    <BudgetCard>
                      <Text style={style.categoryName}>{item.category}</Text>
                      <Text style={style.goalText}>
                        ${item.goalAmount / 100}
                      </Text>
                    </BudgetCard>
                  </TouchableOpacity>
                )}
              />

              {/* buttons */}

              <TouchableOpacity
                onPress={() => props.navigation.navigate('Add Budget')}
              >
                <View style={style.addBudget}>
                  <Text>Add Budget</Text>
                  <MaterialCommunityIcons
                    name='plus-circle'
                    color={'#00A86B'}
                    size={27}
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

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
};

const colors = {
  primary: 'black',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 90,
  },
  budgets: {
    width: '95%',
    ...center,
    backgroundColor: 'lightgrey',
    ...shadow,
  },
  budgetsHeader: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00A86B',
  },
  budgetHeaderText: {
    fontSize: 22,
  },
  singleBudget: {
    height: 100,
    width: '98%',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...center,
  },
  categoryName: {
    fontSize: 20,
  },

  goalText: {
    fontSize: 20,
  },
  addBudget:{
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  chartContainer: {
    height: 320,
    width: '95%',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});
