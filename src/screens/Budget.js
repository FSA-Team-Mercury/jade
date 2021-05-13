import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { client } from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { gql} from '@apollo/client';

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
    const {user} = client.readQuery({
      query: GET_USER,
    });
    setAllBudgets(user.budgets)
    console.log('In BUDGET', user.budgets);
  }, []);

  console.log(allBudgets)


   if (!allBudgets) {
     return (
       <View>
         <ActivityIndicator size='large' color='#00A86B' />
       </View>
     );
   }

  return (
    <View>
      <Text>Budget Screen</Text>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Single Budget')}
        >
          <View>
            <Text>Single Budget</Text>
            <MaterialCommunityIcons
              name='chevron-right'
              color={'#00A86B'}
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Add Budget')}
        >
          <View>
            <Text>Add Budget</Text>
            <MaterialCommunityIcons
              name='chevron-right'
              color={'#00A86B'}
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* displaying all budgets */}
      <SafeAreaView>
        <ScrollView>
          <View style={style.budgets}>
            <View style={styles.budgetsHeader}>
              <Text style={styles.budgetHeaderText}>Budgets</Text>
            </View>
            {allBudgets.map((budget, idx) => {
              return (
                <View key={indx}>
                  <View style={styles.singleBudget}>
                    {/* budget name */}
                    <View style={styles.budgetCategory}>
                      <Text
                        style={styles.companyName}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {item.companyName}{' '}
                      </Text>
                      <Text
                        style={styles.purchaseCategory}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {item.catagory}
                      </Text>
                    </View>
                    {/* price and when it was bought on the bottom */}
                    <View style={styles.priceAndDate}>
                      <Text
                        style={styles.price}
                        ellipsizeMode='tail'
                        numberOfLines={2}
                      >
                        {item.price}{' '}
                      </Text>
                      <Text
                        style={styles.date}
                        ellipsizeMode='tail'
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
    </View>
  );
}


const style = StyleSheet.create({
  budgets: {
    width: '95%',
    ...center,
    backgroundColor: 'lightgrey',
    marginBottom: 10,
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
    fontsize: 18,
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
});
