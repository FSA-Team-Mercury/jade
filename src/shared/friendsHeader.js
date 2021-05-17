import React from 'react'
import {View, Text, Image,TouchableOpacity,StyleSheet} from 'react-native'
export default function FriendsHeader({ navigation }){
   const openProfile = ()=>{
  alert('go to user profile')
  }

  const openExplore = ()=>{
    alert('go to explore page')
  }

  const openSearch = ()=>{
    alert('open search')
  }
  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={ styles.profileButton}
        onPress={openProfile}
        >
        <Image style={styles.profileImage} source={require('../../assets/images/icons8-salah-96.png')}/>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
      <TouchableOpacity
        style={ styles.black}
        onPress={openExplore}
        >
        <Image source={require('../../assets/icons/explore.png')} style={styles.btns}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={ styles.black}
        onPress={openSearch}
        >
        <Image source={require('../../assets/icons/search.png')} style={styles.btns}/>
      </TouchableOpacity>
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
  body:{
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center'
  },
  profileImage:{
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 'auto',
    // resizeMode: 'contain',
    marginLeft: 3
  },
  actionButtons:{
    // backgroundColor: 'lightgrey',
    height: '70%',
    width: '30%',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  profileButton:{
    height: 55,
    width: 55,
    backgroundColor: 'lightgrey',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  btns:{
    height: 30,
    width: 30
  },
})

