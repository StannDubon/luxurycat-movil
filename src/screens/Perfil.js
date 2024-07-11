// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import fetchData from "../utils/fetchdata";
import Buttons from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';

// Definimos el componente funcional Home que recibe la navegación como prop.
export default function Home({ navigation }) {
  // Definimos estados locales para manejar los datos del perfil.
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");

  // Función asincrónica para obtener los datos del perfil del cliente.
  const getPerfilData = async () => {
    try {
      const DATA = await fetchData("cliente", "readProfile");
      if (DATA.status) {
        const usuario = DATA.dataset;
        setNombre(usuario.usuario_nombre);
        setApellido(usuario.usuario_apellido);
        setCorreo(usuario.usuario_correo);
        setUsuario(usuario.usuario_usuario);
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al obtener los datos del perfil");
    }
  };

  // Función asincrónica para manejar la edición del perfil del cliente.
  const handlerEditarPerfil = async () => {
    try {
      const form = new FormData();
      form.append("usuario_nombre", nombre);
      form.append("usuario_apellido", apellido);
      form.append("usuario_usuario", usuario);
      form.append("usuario_correo", correo);

      const DATA = await fetchData("cliente", "editProfile", form);
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
      } else {
        console.log(DATA.error);
        Alert.alert("Error", DATA.error);
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar el perfil");
    }
  };

  // Función asincrónica para manejar el cierre de sesión del cliente.
  const handleLogout = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");
      if (DATA.status) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Sesion' }],
        });
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Función para navegar a la pantalla de cambio de contraseña.
  const navigateCambioContra = async () => {
    navigation.navigate("CambioContra")
  };

  // Efecto para cargar los datos del perfil al montar el componente.
  useEffect(() => {
    getPerfilData();
  }, []);

  // Renderizamos el componente principal de la pantalla de inicio.
  return (
    <View style={styles.container}>
      <>
      <ImageBackground
        source={require("../../src/img/wallpaper2.png")}
        style={styles.decorator}>

        <View style={styles.centeredContainer}>
          <Text style={styles.decoratorText}>Perfil</Text>
        </View>
      </ImageBackground>

      <View style={styles.mainContainer}>

        {/* Input para el nombre */}
        <Input
          placeHolder="Nombre"
          setValor={nombre}
          setTextChange={setNombre}
        />
        
        {/* Input para el apellido */}
        <Input
          placeHolder="Apellido"
          setValor={apellido}
          setTextChange={setApellido}
        />
        
        {/* Input para el usuario */}
        <Input
          placeHolder="Usuario"
          setValor={usuario}
          setTextChange={setUsuario}
        />
        
        {/* Input para el correo */}
        <Input
          placeHolder="Correo"
          setValor={correo}
          setTextChange={setCorreo}
        />

        {}
        <Text></Text>

        {/* Botón para editar el perfil */}
        <Buttons textoBoton='Editar Usuario' accionBoton={handlerEditarPerfil} />

        {/* Botón para cambiar contraseña */}
        <Buttons textoBoton='Cambiar Contraseña' accionBoton={navigateCambioContra} />

        {/* Botón para cerrar sesión */}
        <Buttons textoBoton='Cerrar Sesión' accionBoton={handleLogout} />
        
      </View>
      </>
    </View>
    
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  decorator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 180,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  decoratorText: {
    fontSize: 35,
    color: "white",
    marginTop: 45,
    fontFamily: "FuturaMedium",
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  mainContainer:{
    flex: 1,
    alignItems: "center"
  }
});
