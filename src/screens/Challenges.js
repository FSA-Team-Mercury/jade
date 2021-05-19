import React, {useState, useEffect} from 'react'
import {View,Text, SafeAreaView, ScrollView,Image,TextInput,TouchableOpacity,FlatList,ActivityIndicator,StyleSheet} from 'react-native'
import { client } from "../../App";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_CHALLENGES = gql`
  query GetChallenges{
    userChallenges{
      id
      type
      endDate
      startDate
      completed
    }
  }
`

export default function Challenges(props) {
    const [allChallenges, setAllChallenges] = useState(null);
  
    useEffect(() => {
        const data = client.readQuery({
            query: GET_CHALLENGES,
        });
        setAllChallenges(data.userChallenges);
    });
  
    if (!allChallenges) {
        return (
            <View>
            <ActivityIndicator size="large" color="#00A86B" />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.challenges}>
                    <FlatList
                        data={allChalenges}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <View style={style.challengeContainer}>
                            {/* <Image style={style.badgeImage} source={images[item.badgeImage]}/> //challenge card
                            <Text style={style.badgeType} >{item.type}</Text> */}
                        </View>
                    )}
                    />
                    <TouchableOpacity 
                    // onPress={() => props.navigation.navigate("Add Challenge")}
                    >
                        <View style={style.addChallenge}>
                            <MaterialCommunityIcons
                            name="plus-circle"
                            color={"#00A86B"}
                            size={70}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    challenges: {
        width: '95%',
        ...center,
    },

    challengeContainer: {
        flex: 1, 
        flexDirection: 'column',
    },

    challengeType: {
        fontSize: 18,
        color: '#00A86B',
    },
    
    categoryName: {
        fontSize: 20,
    },
    
    goalText: {
        fontSize: 20,
    },
});