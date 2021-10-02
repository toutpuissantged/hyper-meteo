import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';
import axios from 'axios'
import Data from '../assets/data.json'
import { Button ,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {titleStyle,viewStyle1,textStyle2,infoStyle} from './style/home'
import apiUrlBuilder from './api/apiUrlBulder'
import InformationJsx from './information.jsx'

const match = ['name','country','region','temp_c']
const matchValue = ['location','location','location','current']

export default function Home() {
  const MeteoStruct = Data
  const [meteo,setMeteo] = useState(MeteoStruct)
  const [location,setLocation]  = useState('')
  const [loading,setLoading] = useState(null)
  

  const handleChange = (text) =>{
    setTimeout(()=>{
    setLocation(text)
    console.log(text)
     search()
    },100)
    return 0
  }
  const search = () =>{
    setLoading(true)
    console.log(location)
    axios.get(apiUrlBuilder(location)).then((res)=>{
      console.log(res.data)
      setMeteo(res.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setLoading(null)
    })
  }
  return (
    <View style={{marginTop:70,marginHorizontal:10}}> 
    <Text style={titleStyle}> hyper meteo </Text>
    <View style={viewStyle1}>
      <Text style={textStyle2}><InformationJsx match={match} matchValue={matchValue} loading={loading} meteo={meteo} /> </Text>
    </View>
      <View style={{margin:10}}>
      <Input
        placeholder='set location'
        defaultValue={location}
        onChangeText={text => handleChange(text)}
      />
      <Button
        title="search"
        type="solid"
        onPress={(e)=>{search()}}
      />
      </View>
    </View>
  );
}