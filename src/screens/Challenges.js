import React, {useState, useEffect} from 'react'
import {View,Text, SafeAreaView, ScrollView,Image,TextInput,TouchableOpacity,FlatList,ActivityIndicator,StyleSheet} from 'react-native'
import { client } from "../../App";
import { gql, useQuery, useMutation } from "@apollo/client";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SingleChallenge from "./SingleChallenge"
import MultiPlayerChallenges from './MultiPlayerChallenges'
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

export default function Challenges({props}) {
    const [allChallenges, setAllChallenges] = useState(null);

    useEffect(() => {
        const data = client.readQuery({
            query: GET_CHALLENGES,
        });
        setAllChallenges(data.userChallenges);
        console.log(data.userChallenges)
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
            <View style={style.challengesHeader}>
                <Text style={style.challengesHeaderText}>Challenges</Text>
            </View>
            <MultiPlayerChallenges />
            <View style={style.container}>
                <View style={style.challenges}>
                    <FlatList
                        data={allChallenges}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <View style={style.challengeContainer}>
                            <SingleChallenge item={item}/>
                        </View>
                    )}
                    />
                    <TouchableOpacity
                    onPress={() => props.navigation.navigate("Add Challenge")}
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

    challengesHeader: {
        height: 50,
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#00A86B",
    },

    challengesHeaderText: {
        fontSize: 22,
        color: 'white',
        // color: 'black',
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

    addChallenge: {
        display: 'flex',
        alignItems: 'center',
    },

    categoryName: {
        fontSize: 20,
    },

    goalText: {
        fontSize: 20,
    },
});
