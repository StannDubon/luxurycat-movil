import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import fetchData from "../utils/fetchdata";
import Buttons from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");

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
      Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
    }
  };

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
      Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
    }
  };

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

  const navigateCambioContra = async () => {
    navigation.replace("CambioContra")
  };

  useEffect(() => {
    getPerfilData();
  }, []);

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

      <Input
            placeHolder="Nombre"
            setValor={nombre}
            setTextChange={setNombre}
          />
          <Input
            placeHolder="Apellido"
            setValor={apellido}
            setTextChange={setApellido}
          />
          <Input
            placeHolder="Usuario"
            setValor={usuario}
            setTextChange={setUsuario}
          />
          <Input
            placeHolder="Correo"
            setValor={correo}
            setTextChange={setCorreo}
          />

          <Text></Text>

      <Buttons textoBoton='Editar Usuario' accionBoton={handlerEditarPerfil} />

      <Buttons textoBoton='Cambiar Contraseña' accionBoton={navigateCambioContra} />

      <Buttons textoBoton='Cerrar Sesión' accionBoton={handleLogout} />
        
      </View>
      </>
    </View>
    
  );
}

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