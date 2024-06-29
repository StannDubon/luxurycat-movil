import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// npm install @react-navigation/native
// npm install @react-navigation/native-stack

import Sesion from './src/screens/Sesion.js'
import Navigator from './src/navigation/Navigator.js';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Sesion'
        screenOptions={{headerShown: false}}>

        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Navigator" component={Navigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
