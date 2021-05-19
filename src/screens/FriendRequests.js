import React, {useState,useEffect} from 'react'

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import { client } from "../../App";
import { gql,useQuery,useMutation } from "@apollo/client";

const FETCH_PENDING_FRIENDS = gql`
  query FetchFriends{
    pendingFriends{
      id
      username
      profileImage
    }
  }
`

const ACCEPT_FRIEND_REQ = gql`
  mutation AcceptFriendReq($friendId: ID){
    acceptFriendReq(friendId: $friendId){
      friendId
    }
  }
`


// to add to the friend catch
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
  }
`

export default function FriendRequests(){
  const [acceptFriend] = useMutation(ACCEPT_FRIEND_REQ)
  const [pendingFriends, setPendingFriends] = useState([])
  const {data, loading, error} = useQuery(FETCH_PENDING_FRIENDS)

  useEffect(()=>{
      console.log('data in effect', data)
      const res = data ? data.pendingFriends : false
      if(loading === false && data){
        setPendingFriends(res);
    }

  },[loading, data])

    if (loading) {
        return (
          <View >
            <ActivityIndicator size="large" color="#00A86B" />
          </View>
        );
      }
    // setPendingFriends(res)

  async function acceptReq(friendId){
    await acceptFriend({
      variables:{
        friendId
      },
      update(cache){
        cache.modify({
          fields:{
            pendingFriends(pendingFriends,{readField}){
              console.log('filtering',pendingFriends)
              let newPendingList =  pendingFriends.filter(user=> {
                return friendId !== readField('id', user)
              })
              setPendingFriends(newPendingList)
              return newPendingList
            }
          }
        })
      }
    })
  }
  console.log('pending friends--->>', pendingFriends)
  return (
      <View style={styles.friendReqBody}>
        {/* <Text style={styles.title}>
          Pending Friend Requests
        </Text> */}
        {
          !pendingFriends.length ? <Text>No friend requests</Text> :(
            pendingFriends.map(user=>{
              console.log('user-->', user)
              return (
                <View style={styles.userContainer}>
                  <View style={styles.levelOne}>
                    <View style={styles.profileImage}></View>
                    <Text style={styles.username}>{user.username}</Text>
                  </View>
                  <View style={styles.levelTwo}>
                    {/* <Text style={styles.dateRequested}>{user.createdAt}</Text> */}
                    <TouchableOpacity
                      onPress={()=>{
                        return acceptReq(user.id)
                      }}
                      >
                      <Text style={styles.dateRequested}>Add as Friend</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })
          )
        }
      </View>)
}

const center={
  marginLeft: 'auto',
  marginRight: 'auto'
}

const shadow = {
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 10,
};

const styles = StyleSheet.create({
  friendReqBody:{
    width: '100%',
    alignItems: 'center'
  },
  title:{
    fontSize: 20,
    fontWeight: '600',
    ...center,
    marginBottom: 20,
    marginTop: 20
  },
  userContainer:{
    height: 120,
    width: '90%',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
    ...shadow
  },
  levelOne:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage:{
    height: 70,
    width: 70,
    backgroundColor: 'black',
    borderRadius: 100
  },
  username:{
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600'
  },
  levelTwo:{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dateRequested:{
    fontSize: 15,
    fontWeight: '500'
  }
})

