import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Mybutton = ({title, OnPress}) => {
  return (
      <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={OnPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
     button:{
     backgroundColor:"orange",
     paddingHorizontal:40,
     paddingVertical:15,
     borderRadius:10,
     alignItems:"center"
     },
     text:{
     fontSize:16,
     color:"white",
     fontWeight:"bold",
     alignItems:"center"
     }
 })

export default Mybutton