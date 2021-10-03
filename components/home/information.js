import React from 'react' 
import {Text, View} from 'react-native';
import {infoStyle} from '../style/home'

const MeteoCard = (props) =>{
  const match = ['name', 'country', 'region', 'temp_c'];
  const matchValue = ['location', 'location', 'location', 'current'];
  const meteo = props.meteo
  return <View>
      {match.map((data,index)=> <Text key={index} style={infoStyle}> 
        {'\n'}{data} : {meteo[matchValue[index]][data]}{'\n'} 
      </Text> )} 
    </View>
}

 const InformationJsx = (props) =>{
    const loading = props.loading
    const meteo = props.meteo
    if (typeof(loading)!=="boolean") return <Text>
      no data
    </Text> 
    else if(loading) return <Text>
        Loading ...
      </Text>
    else if(!loading) return <MeteoCard meteo={meteo} />
  }

export default InformationJsx