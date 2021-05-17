import React, {useState} from 'react'
import {View,Text, SafeAreaView, ScrollView,Image,TextInput,TouchableOpacity, StyleSheet} from 'react-native'

import { client } from "../../App";
import { gql,useQuery } from "@apollo/client";

const FETCH_MUTUAL_FRIENDS = gql`
query FetchFriends{
  friends{
    id
    username
    profileImage
    friends{
      userId
    }
  }
}`;

const FETCH_FRIENDS = gql`
  query FetchFriends{
    friends{
      id
      username
      profileImage
      badges{
        type
        imageUrl
        createdAt
      }
    }
  }`;

async function getFriendsDb(){

}

export default function MutualFriends(props){
  const [friends, setFriends] = useState([])
  const [dbMutualFriendes, setMutualFriends] = useState([])

  const {data, loading, error} = useQuery(FETCH_FRIENDS)
  if (loading) {
    return (
      <View style={friend.container}>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }else{
    if (!friends.length){
      setFriends(data.friends)
    }
  }

  console.log("REALL DATA!!!\n", friends)

  const friendIds = friends.reduce((accum, friend)=>{
    accum.push(friend.id)
    return accum
  },[])


  console.log('IDS--->', friendIds)
  mutualFriends = [1,3,4]
  return (
    <View style={friend.page}>
      {
        mutualFriends.map((user, index)=>{
          return (
            <View style={friend.container} key={index}>
              <View style={friend.levelOne}>
                <View style={friend.profileImageContainer}>
                  <Image source={require('../../assets/images/icons8-rihanna-96.png')} style={friend.profilePic}/>
                </View>
                <View >
                  <Text style={friend.name}>Name</Text>
                  <Text style={friend.userName}>UserName</Text>
                </View>
              </View>
              <View style={friend.levelTwo}>
                <Text>Some Badges</Text>
              </View>

              <View style={friend.levelThree}>
                <View style={friend.followedBy}>
                  <View style={friend.friend}>
                  <Image source={require('../../assets/images/icons8-ozil-96.png')} style={friend.friendImage}/>
                  </View>
                  <View style={friend.friend}>
                  <Image source={require('../../assets/images/icons8-salah-96.png')} style={friend.friendImage}/>
                  </View>
                </View>
                <TouchableOpacity
                style={friend.follow}
                >
                  <Text>Follow</Text>
                </TouchableOpacity>
             </View>

            </View>
          )
        })
      }
    </View>
  )
}

const shadow = {
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10,
};

const friend = StyleSheet.create({
  page:{
    width:'100%',
    marginRight: 'auto',
    marginLeft:'auto',
    // backgroundColor:'yellow',
    alignItems:'center'
  },
  container:{
    height: 170,
    width: '90%',
    // backgroundColor: '#f4f6f8',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft:'2%',
    paddingRight:'2%',
    paddingTop:'1%',
    paddingBottom:'3%',
    ...shadow
  },
  levelOne:{
    height: 70,
    width: '100%',
    // backgroundColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center'

  },
  profileImageContainer:{
    height: 65,
    width: 65,
    backgroundColor: 'black',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profilePic:{
    height: 60,
    width: 60,
    borderRadius: 20
  },
  name:{
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  userName:{
    fontSize: 12,
    fontWeight: '300'
  },
  levelTwo:{
    height: 55,
    // backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  levelThree:{
    flex: 1,
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  followedBy:{
    flexDirection: 'row'
  },
  friend:{
    height: 35,
    width: 35,
    borderRadius: 100,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  friendImage:{
    height: 30,
    width: 30,
  },
  follow:{
    height: 30,
    width: 100,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5
  }
})
