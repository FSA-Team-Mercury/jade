import React,{useState} from "react";
import { View, Text,StyleSheet,SafeAreaView, ScrollView, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const seedData = [
  {
    companyName: "mcDonald's",
    catagory: 'food',
    datePurchased: 'May 09, 2021',
    price: '$10.99'
  },
  {
    companyName: "mcDonald's",
    catagory: 'Entertainment',
    datePurchased: 'May 09, 2021',
    price: '$10.99'
  },
  {
    companyName: "mcDonald's",
    catagory: 'food',
    datePurchased: 'May 09, 2021',
    price: '$10.99'
  },
  {
    companyName: "mcDonald's",
    catagory: 'food',
    datePurchased: 'May 09, 2021',
    price: '$10.99'
  },
  {
    companyName: "mcDonald's",
    catagory: 'food',
    datePurchased: 'May 09, 2021',
    price: '$10.99'
  }
]

export default function Dashboard() {
  const [search,setSearch] = useState('')
  function onChangeText(value){
    setSearch(value)
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.dashBoard} onScroll={(event)=>alert(event.target.scrollTo)}>
        <View style={styles.header}>
          <TextInput
            style={styles.search}
            onChangeText={onChangeText}
            value={search}
            placeholder=" Search..."
          />
          <Icon name="search1" size={30} color="white" />
        </View>
        <View style={styles.transactions}>
          {
            seedData.map((item, index)=>{
              return (
                <View key={index} >
                  <View style={styles.singleTransaction}>
                    {/* catigory picture (entertainment, food, shoping...) */}
                    <View style={styles.catagoryPic}></View>
                    {/* componay name and catagory on the bottom */}
                    <View style={styles.nameAndCategory}>
                      <Text style={styles.companyName} ellipsizeMode='tail' numberOfLines={2}>{item.companyName} </Text>
                      <Text style={styles.purchaseCategory} ellipsizeMode='tail' numberOfLines={2}>{item.catagory}</Text>
                    </View>
                    {/* price and when it was bought on the bottom */}
                    <View style={styles.priceAndDate}>
                      <Text style={styles.price} ellipsizeMode='tail' numberOfLines={2}>{item.price} </Text>
                      <Text style={styles.date} ellipsizeMode='tail' numberOfLines={2}>{item.datePurchased}</Text>
                    </View>
                  </View>
                  <View style={styles.borderBottom}></View>
                </View>
              )
            })
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
    backgroundColor: 'lightgrey',
    marginBottom: 10,
  },
  seeAll:{
    fontSize:18,
  },
  singleTransaction:{
    height: 100,
    width: '98%',
    backgroundColor: 'lightgrey',
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
