import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importa tus componentes de pantalla aquí
import Productos from '../screens/Productos';  // Importa el componente de pantalla Productos desde la ruta relativa '../screens/Productos'
import Home from '../screens/Home';            // Importa el componente de pantalla Home desde la ruta relativa '../screens/Home'
import Carrito from '../screens/Carrito';      // Importa el componente de pantalla Carrito desde la ruta relativa '../screens/Carrito'
import Perfil from '../screens/Perfil';        // Importa el componente de pantalla Perfil desde la ruta relativa '../screens/Perfil'

const Tab = createBottomTabNavigator();  // Crea un navegador de pestañas inferior utilizando la función createBottomTabNavigator de '@react-navigation/bottom-tabs'

const TabNavigator = () => {
  return (
    // Configuración y estructura del navegador de pestañas
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,                         // Oculta el header de la navegación
        tabBarActiveTintColor: '#000',              // Color de los íconos activos en la barra de pestañas
        tabBarInactiveTintColor: '#000',            // Color de los íconos inactivos en la barra de pestañas
        tabBarStyle: {                              // Estilo de la barra de pestañas
          backgroundColor: '#FFF',                // Color de fondo de la barra de pestañas
          height: 60,                              // Altura de la barra de pestañas
          borderTopWidth: 0                        // Ancho del borde superior de la barra de pestañas (en este caso, 0 para no mostrar borde)
        },
        tabBarIcon: ({ focused, color, size }) => {  // Función que define el ícono y su comportamiento en la barra de pestañas
          let iconName;
          if (route.name === 'Home') {            // Si la ruta es 'Home'
            iconName = focused ? 'home' : 'home-outline';  // Asigna el ícono 'home' si está seleccionado (focused), de lo contrario, 'home-outline'
          } else if (route.name === 'Productos') {  // Si la ruta es 'Productos'
            iconName = focused ? 'bag-handle' : 'bag-handle-outline';  // Asigna el ícono 'bag-handle' si está seleccionado (focused), de lo contrario, 'bag-handle-outline'
          } else if (route.name === 'Carrito') {   // Si la ruta es 'Carrito'
            iconName = focused ? 'cart' : 'cart-outline';  // Asigna el ícono 'cart' si está seleccionado (focused), de lo contrario, 'cart-outline'
          } else if (route.name === 'Perfil') {    // Si la ruta es 'Perfil'
            iconName = focused ? 'person' : 'person-outline';  // Asigna el ícono 'person' si está seleccionado (focused), de lo contrario, 'person-outline'
          }
          return <Ionicons name={iconName} color={color} size={size} />;  // Retorna el componente Ionicons con el ícono especificado, color y tamaño
        },
      })}
    >
      <Tab.Screen
        name="Home"              
        component={Home}          
        options={{ title: '' }}   
      />
      <Tab.Screen
        name="Productos"          
        component={Productos}     
        options={{ title: '' }}   
      />
      <Tab.Screen
        name="Carrito"            
        component={Carrito}       
        options={{ title: '' }}   
      />
      <Tab.Screen
        name="Perfil"             
        component={Perfil}        
        options={{ title: '' }}   
      />
    </Tab.Navigator>
  );
};

// Exporta el componente TabNavigator como componente por defecto
export default TabNavigator;  
