import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'; // Asegúrate de importar expo-font

import Sesion from './src/screens/Sesion';
import Registro from './src/screens/Registro';
import Navigator from './src/navigation/Navigator';

// Pantallas que no tendran bottombar
import Categoria from './src/screens/Categoria';
import Info from './src/screens/ProductoInfo';

// Cambio de contraseña
import CambioContra1 from './src/screens/CambioContra-1';
import CambioContra2 from './src/screens/CambioContra-2';
import CambioContra3 from './src/screens/CambioContra-3';

//Importacion de fuente
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

        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Navigator" component={Navigator} />
        
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Categoria" component={Categoria} />

        <Stack.Screen name="CambioContra1" component={CambioContra1} />
        <Stack.Screen name="CambioContra2" component={CambioContra2} />
        <Stack.Screen name="CambioContra3" component={CambioContra3} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
