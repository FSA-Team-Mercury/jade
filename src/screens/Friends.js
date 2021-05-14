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
import FriendCard from './FriendCard';

// const GET_USER = gql` //query to get friends
//   query GetUser {
//     user {
//       friends {
//         username
//       }
//     }
//   }
// `;

const user = { //DUMMY DATA - comment this out when query is working
  friends: [{username: 'steve'}, {username: 'boris'}, {username: 'amy'}] 
}

export default function Friends(props) {
  const [allFriends, setAllFriends] = useState(null);

  useEffect(() => {
    // const { user } = client.readQuery({ //coment back in once query is working
    //   query: GET_USER,
    // });
    setAllFriends(user.friends);
  }, []);

  if (!allFriends) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00A86B' />
      </View>
    );
  }
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <View style={style.friends}>
            <View style={style.friendsHeader}>
              <Text style={style.friendsHeaderText}>Your Friends</Text>
            </View>
            <FlatList
              data={allFriends}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Single Friend')}
                >
                  <FriendCard>
                    <Text style={style.categoryName}>{item.username}</Text>
                    {/* add image? */}
                  </FriendCard>
                </TouchableOpacity>
              )}
            />

            {/* buttons */}

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Add Friend')}
            >
              <View style={style.addFriend}>
                <Text>Add Friends</Text>
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
  );
}

const center = {
  marginRight: 'auto',
  marginLeft: 'auto',
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
  scrollView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  budgets: {
    width: '95%',
    ...center,
    backgroundColor: 'lightgrey',
    ...shadow,
  },
  friendsHeader: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00A86B',
  },
  friendsHeaderText: {
    fontSize: 22,
  },
  singleFriend: {
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
  // goalText: {
  //   fontSize: 20,
  // },
  addFriend: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});
