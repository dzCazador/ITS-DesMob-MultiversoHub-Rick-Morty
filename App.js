import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './screens/HomeStack'; 
import Favorites from './screens/Favorites';
import Weather from './screens/Weather';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen name="Inicio" options={{ headerShown: false }} >
      {() => <HomeStack favorites={false} />}
      </Tab.Screen>
      <Tab.Screen name="Favoritos">
        {() => <HomeStack favorites={true} />}
      </Tab.Screen>
      <Tab.Screen name="Clima" component={Weather} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}