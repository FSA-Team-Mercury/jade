import React,{useState} from "react";
// import moment from 'moment';
// moment().format();
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TextInput,
  Image
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import SingleTransaction from './SingleTransaction'
import { useNavigation } from '@react-navigation/native';



export default function Dashboard({route, navigation}) {
  const [search,setSearch] = useState('')
  const [searchTransactions,setSearchTransactions] = useState([])
  function onChangeText(value){
    setSearch(value)
  }
  let {transactions} = route.params

  function searchUserTransactions(){
    const resSearch = transactions.filter(item=>{
      let category = item.category[0].toLowerCase().includes(search.toLowerCase())
      let merchant_name = false
      if (item.merchant_name){
      merchant_name = item.merchant_name.toLowerCase().includes(search.toLowerCase())
      }
      return category || merchant_name
    })
    setSearchTransactions(resSearch)
  }

  function handleChange(value){
    setSearch(value)

    if (!value){
      return
    }
    searchUserTransactions()
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.dashBoard}>
        <View style={styles.searchBox}>
          <Image source={require('../../assets/icons/search.png')} style={styles.searchIcon}/>
          <TextInput style={styles.searchField} placeholder="Search..."
          onChangeText={onChangeText}
          value={search}
          placeholder=" Search..."
          onChange={handleChange}
          />
        </View>
        <View style={styles.transactions}>
        {
          // when using search
          search ? (
            searchTransactions.map((item, index)=>{
              return <SingleTransaction item={item} key={index}/>
            })


          ) : (
            // when viewing all transactions
            <FlatList
            data={transactions}
            keyExtractor={(item) => item.account_id}
            renderItem={
              (props)=>{
                return (
                  <View>
                    <SingleTransaction {...props}/>
                </View>
                )
              }
            }
          >
          </FlatList>
          )
        }

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const center = {
  marginRight: 'auto',
  marginLeft: 'auto'
}

const colors = {
  primary: 'black'
}

const shadow = (size)=>{
  return {
    shadowOffset:{
      width: size,
      height: size
    },
    shadowOpacity: .2,
    shadowRadius: 5
  }
}

const styles = StyleSheet.create({
  searchBox:{
    height: 50,
    width: '90%',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    ...center
  },
  searchIcon:{
    height: 20,
    width: 20,
    marginLeft: 15
  },
  searchField:{
    height: 30,
    width: '60%',
    marginLeft: 10,
  },
  dashBoard:{
    height: '100%',
    width: '100%',
    // backgroundColor: '#adffe1',
    backgroundColor: 'white',
    overflow:'scroll',
  },
  header:{
    height: 55,
    width: '95%',
    backgroundColor: 'lightgrey',
    ... center,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft: 10,
    paddingRight: 10,
    ...shadow(1)
  },
  search:{
    height: '80%',
    width: '90%',
    backgroundColor: 'white',
    marginRight: 'auto',
    borderRadius: 10

  },
  filterContainer:{
    height: '90%',
    width: '20%',
    backgroundColor:'white'
  },
  transactions:{
    width: '95%',
    ...center,
    // backgroundColor: 'lightgrey',
    marginBottom: 10,
  },
  seeAll:{
    fontSize:18,
  },
  singleTransaction:{
    height: 100,
    width: '98%',
    // backgroundColor: 'lightgrey',
    borderRadius: 10,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    ...center
  },
  catagoryPic:{
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: '#00A86B',
    marginLeft: 10,
    marginRight: 10,
  },
  nameAndCategory:{
    height: '42%',
    width: '50%',
    display:'flex',
    justifyContent: 'space-between',
  },
  companyName:{
    fontSize: 16,
    height: 16,
    color: colors.primary
  },
  purchaseCategory:{
    fontSize:14,
    height: 14,
    color: '#585252'
  },
  priceAndDate:{
    height: '42%',
    flex: 1,
    marginRight:10,
    display:'flex',
    justifyContent: 'space-between',
    // backgroundColor:'red',
    marginLeft:'auto'

  },
  price:{
    fontSize: 16,
    marginLeft:'auto'
  },
  date:{
    marginLeft:'auto',
    color: '#585252'
  },
  borderBottom:{
    height: 2,
    width: '90%',
    backgroundColor: 'lightgrey',
    ...center,
  }
})
