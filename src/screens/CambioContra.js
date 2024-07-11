import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import fetchData from "../utils/fetchdata";
import Buttons from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';

export default function Home({ navigation }) {
  const [actual, setActual] = useState("");
  const [newPass, setNewPass] = useState("");
  const [cnewPass, setCNewPass] = useState("");

  const handleChangePassword = async () => {
    try {

      const form = new FormData();
        form.append("usuario_contraseña", actual);
        form.append("usuario_nueva_contraseña", newPass);
        form.append("usuario_confirmar_nueva_contraseña", cnewPass);

      const DATA = await fetchData("cliente", "changePassword", form);
      if (DATA.status) {
        Alert.alert("Hecho!", DATA.message);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
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
            placeHolder="Contraseña Actual"
            setValor={actual}
            setTextChange={setActual}
            contra={true}
          />
          <Input
            placeHolder="Contraseña Nueva"
            setValor={newPass}
            setTextChange={setNewPass}
            contra={true}
          />
          <Input
            placeHolder="Confirmar Nueva Contraseña"
            setValor={cnewPass}
            setTextChange={setCNewPass}
            contra={true}
          />

          <Text></Text>

      <Buttons textoBoton='Cambiar Contraseña' accionBoton={handleChangePassword} />
        
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