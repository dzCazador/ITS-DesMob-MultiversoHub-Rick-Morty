import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack({ favorites = false }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} initialParams={{ favorites: favorites }} />
      <Stack.Screen name="Detalle" component={DetailScreen} />
    </Stack.Navigator>
  );
}