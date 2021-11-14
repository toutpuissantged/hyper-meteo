
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import HomeScreen from './components/home/home'
import AboutScreen from './components/about/about'

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" default component={HomeScreen} />
        <Stack.Screen name="About" default component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
