import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'; // Asegúrate de importar expo-font

import Sesion from './src/screens/Sesion';
import Navigator from './src/navigation/Navigator';
import Categoria from './src/screens/Categoria';
import Info from './src/screens/ProductoInfo';

const FuturaFont = {
  FuturaMedium: require('./src/fonts/FuturaLTPaneuropeanMedium.ttf'),
  FuturaBook: require('./src/fonts/FuturaLTPaneuropeanBook.ttf'),
  FuturaHeavy: require('./src/fonts/FuturaLTPaneuropeanHeavy.ttf'),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(FuturaFont);
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Muestra un cargador o pantalla de carga mientras se cargan las fuentes
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Sesion'
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Navigator" component={Navigator} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Categoria" component={Categoria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
