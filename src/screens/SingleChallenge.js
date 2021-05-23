import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet,ActivityIndicator,Image } from "react-native";
import { useMutation } from '@apollo/client';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {UPDATE_CHALLENGE} from '../queries/multiChallenges'
import { images } from "../styles/global";
const moment = require("moment");
moment().format();

const calculateWinner = (users,targetAmount, winCondition)=>{
  switch (winCondition) {
    case 'LESS_THAN':
      let greaterThanOrder = users.sort((a,b)=>{
        return a.user_challenge.currentAmout - b.user_challenge.currentAmout
      })
      // in order to be a valid win they have to spend the targetAmount at min
      return greaterThanOrder //>= targetAmount ? greaterThanOrder : []
    case "GREATER_THAN":
      let lessThanOrder = users.sort((a,b)=>{
          return  b.user_challenge.currentAmout - a.user_challenge.currentAmout
        })
      // in order to be a valid win they have to spend the targetAmount at min
      return lessThanOrder //<= targetAmount ? lessThanOrder : []
    default:
      return {
        error : 'not proper winCondition'
      };
  }
}


export default function SingleChallenge({route}) {
  const [updateChallenge] = useMutation(UPDATE_CHALLENGE);
  const [challenge, setChallenge] = useState(false)

  useEffect(()=>{
    updateChallenge({
      variables:{
        challengeId: route.params.challengeId
      }}).then((res)=>{
        console.log('res--->',res.data.updateChallenge)
        setChallenge(res.data.updateChallenge)
      }).catch((err)=>{
        console.log('error-->',err)
      })

  },[])

  if (!challenge){
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    )
  }

  function getWinCondtion(){
    if (challenge.winCondition === 'GREATER_THAN'){
      return `Spending the most in the group and spending at least $${challenge.winAmount/100}`
    }else{
       return `Spending the least in the group and spending less than $${challenge.winAmount/100}`
    }
  }
  const userRanks = calculateWinner(challenge.users,challenge.winAmount, challenge.winCondition)

  const challengeId = route.params.challengeId
  console.log('endDate--->', challenge.endDate)
  console.log('winCondition--->', challenge)
  return (
    <View style={styles.page}>
      <View style={styles.countdown}>
        <Text>Badge Image</Text>
        <Image style={styles.profileImage} source={images.badges[challenge.badgeImage]}/>
      </View>
      <View style={styles.countdown}>
        <Text>Wind By:</Text>
        <Text>{getWinCondtion()}</Text>
      </View>
      <View style={styles.countdown}>
        <Text>Time to complete: {route.params.endDate}</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.orderTitle}>Ranks</Text>
      </View>


      {
        challenge.users.map((user, index)=>{
          console.log('USER!!-->', user)
          console.log(challenge.winner, user.id)
          return (
            <View style={user.id === challenge.winner ? styles.winner : styles.singleUser}>
              <Image style={styles.profileImage} source={images.avatar[user.profileImage]}/>
              <View style={styles.imageName}>
                <Text style={styles.name}>{user.username}</Text>
                <Text style={styles.name}>Total Spent: {user.user_challenge.currentAmout}</Text>
              </View>

              <Text></Text>
            </View>
          )
        })
      }

    </View>
  )
};

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
  page:{
    height: '100%',
    width: '100%',
    alignItems: 'center',

  },
 countdown:{
   height: 100,
   width: '90%',
   backgroundColor: 'white',
   marginTop: 10,
   ...shadow,
   alignItems: 'center',
   justifyContent: 'center'
 },
 header:{
   height: 70,
   width: '90%',
   backgroundColor: 'white',
   ...shadow,
   marginTop: 30,
   justifyContent: 'center',
   alignItems: 'center'
 },
 orderTitle:{
   fontSize: 20,
   fontWeight: '500'
 },
 winner:{
   height: 100,
   width: '90%',
   marginTop: 10,
   backgroundColor: 'lightgreen',
   ...shadow,
   padding: 15,
   borderRadius: 10,
   flexDirection: 'row'
 },
 singleUser:{
   height: 100,
   width: '90%',
   marginTop: 10,
   backgroundColor: 'white',
   ...shadow,
   padding: 15,
   borderRadius: 10,
   flexDirection: 'row'
 },
 imageName:{
  flex: 1,
  // flexDirection: 'row',
  justifyContent: 'center',
  // backgroundColor: 'yellow'
 },
 name:{
   fontSize: 16,
   fontWeight: '500',
   marginLeft: 20,
   margin: 2
 },
 profileImage:{
   borderRadius: 100,
   height: 70,
   width: 70,
   backgroundColor: 'lightgrey',
   ...shadow,
   marginTop: 'auto',
   marginBottom: 'auto',
 }
});
