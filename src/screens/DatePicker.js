import React from 'react'
import DatePicker from 'react-native-date-picker'
import {View} from 'react-native'

export default ({date, setDate})=>{
  return(
  <View>
    <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
        />
  </View>)
}
