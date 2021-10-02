import React from 'react' 
import {Text, View} from 'react-native';
import {infoStyle} from './style/home'

 const InformationJsx = (props) =>{
    const match = props.match
    const matchValue = props.matchValue
    const loading = props.loading
    const meteo = props.meteo

    if(loading===true) return <Text>
        Loading ...
      </Text>
    else if (loading===null) return <Text>
      no data
    </Text> 
    else return <View>
    {match.map((data,index)=> <Text key={index} style={infoStyle}> 
        {'\n'}{data} : {meteo[matchValue[index]][data]}{'\n'} 
        </Text> )} 
    </View>
  }

export default InformationJsx