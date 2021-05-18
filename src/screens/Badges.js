import React, {useState, useEffect} from 'react'
import {View,Text, SafeAreaView, ScrollView,Image,TextInput,TouchableOpacity,FlatList,ActivityIndicator,StyleSheet} from 'react-native'
import { client } from "../../App";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_BADGES = gql`
  query GetBadges{
    userBadges{
      id
      type
      imageUrl
    }
  }
`

// const badges = [
//     {id: 1, type: "big-saver", imageUrl: "https://www.pngkit.com/png/full/201-2012600_image-result-for-pokemon-red-and-blue-logo.png"}, 
//     {id: 2, type: "big-spender", imageUrl: "https://www.pngkit.com/png/full/201-2012600_image-result-for-pokemon-red-and-blue-logo.png"},
//     {id: 3, type: "big-saver", imageUrl: "https://www.pngkit.com/png/full/201-2012600_image-result-for-pokemon-red-and-blue-logo.png"},
//     {id: 4, type: "big-spender", imageUrl: "https://www.pngkit.com/png/full/201-2012600_image-result-for-pokemon-red-and-blue-logo.png"}]

export function Badges(props) {
    const [allBadges, setAllBadges] = useState(null);
  
    useEffect(() => {
        const badges = client.readQuery({
            query: GET_BADGES,
        });
        setAllBadges(badges.userBadges);
    });
  
    if (!allBadges) {
        return (
            <View>
            <ActivityIndicator size="large" color="#00A86B" />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={style.container}>
                <View style={style.badges}>
                    <FlatList
                    data={allBadges}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={style.badgeContainer}>
                            <Image style={style.badgeImage} source={require("../../assets/badges/rainbow.png")}/> 
                            <Text style={style.badgeType} >{item.type}</Text>
                        </View>
                    )}
                    />
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    badges: {
        width: '95%',
        ...center,
        backgroundColor: '#ededed',
        ...shadow,
    },

    badgeContainer: {
        flex: 1, 
        flexDirection: 'column',
    },

    badgeType: {
        fontSize: 18,
        // backgroundColor: '#00A86B',
        // color: 'white',
    },

    badgeImage: {
        height: 100,
        width: '25%',
    },
    
    categoryName: {
        fontSize: 20,
    },
    
    goalText: {
        fontSize: 20,
    },
});