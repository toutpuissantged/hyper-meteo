import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Data from '../data/data.json';
import { Button, Input ,Icon as IconNative } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { titleStyle, viewStyle1, textStyle2, infoStyle } from '../style/home';
import apiUrlBuilder from '../api/apiUrlBulder';
import InformationJsx from './information';
import { Tab } from 'react-native-elements';


const getCurrentTime = () => {
  return new Date().getTime();
};

const fetchDataBuild = (get_data) =>{
  const fetched = Data
  fetched.location.name = get_data.location.name
  fetched.location.region = get_data.location.region
  fetched.location.country = get_data.location.country
  fetched.current.temp_c = get_data.current.temp_c
  return fetched
}

export default function Home({ navigation }) {
  const MeteoStruct = Data;
  const [meteo, setMeteo] = useState(MeteoStruct);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(null);
  const [timer, setTimer] = useState(getCurrentTime());

  const handleChange = (text) => {
    if(typingDelaiPassed(timer,setTimer)){
    setTimeout(() => {
      setLocation(text);
      console.log(text);
      //search() 
    }, 10)}
    return 0
  };
  const NavBar = () =>{
    return <View>
      <Tab style={{
        color:'white',
        fontSize:10
      }}>
        <Tab.Item title="about" style={{
           backgroundColor: 'royalblue',
           width: '100%' ,
           color:'white',
           fontSize:10
           }} />
        <Tab.Item title="favorite" />
        <Tab.Item title="cart" />
      </Tab>
      
    </View>
  }
  const typingDelaiPassed = (timer,setTimer) =>{
    const delai = 500
    const now = getCurrentTime()
    console.log(now-timer)
    if(now>(timer+delai)){
      setTimer(now)
      return true
    }
    else return false
  }

  const search = () => {
    setLoading(true);
    console.log(location);
    axios
      .get(apiUrlBuilder(location))
      .then((res) => {
        setMeteo(fetchDataBuild(res.data))
        console.log(meteo)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(null);
      });
  };
  return (
    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
      <Text style={titleStyle}> hyper meteo </Text>
      <View style={viewStyle1}>
        <Text style={textStyle2}>
          <InformationJsx 
            loading={loading}
            meteo={meteo}
          />{' '}
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <Input
          placeholder="set location"
          defaultValue={location}
          onChangeText={(text) => handleChange(text)}
        />
        <Button
          title="search"
          type="solid"
          onPress={(e) => {
            search();
          }}
        />
        
      </View>
    </View>
  );
}
