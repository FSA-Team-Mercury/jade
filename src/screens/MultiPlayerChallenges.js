import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Picker
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_MULTI_PLAYER_CHALLENGE,
  FETCH_ALL_CHALLENGES,
  FETCH_CURENT_CHALLENGES,
  LEAVE_CHALLENGE,
} from "../queries/multiChallenges";


export default ()=>{
  const { data, loading, error } = useQuery(FETCH_ALL_CHALLENGES);
  const isFocused = useIsFocused();
  const [multiPlayerChallenges, setMultiPlayerChallenges] = useState(null)
  const [userCompenting, setUsersCompeting] = useState(null)

  useEffect(()=>{
    // console.log('endDate-->', endDate)
    return () => {
      console.log("unmounting multi user challenges");
    };
  },[isFocused])
  function getUsersCompeting(users){
    const newObj = users.reduce((accum,user)=>{
      accum.push()
    },[])
  }
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00A86B" />
      </View>
    );
  }
  if (!multiPlayerChallenges){
    setMultiPlayerChallenges(data.allMultiPlayerChallenges || {})
    try {
      setUsersCompeting(data.allMultiPlayerChallenges.multiPlayerChallenges[0].users)
    } catch (error) {
      setUsersCompeting([])
    }
  }
  console.log('multi user competing--->', userCompenting)
  return (
    <View>
      <Text>Challenges Against Friends</Text>
    </View>
  )
}
