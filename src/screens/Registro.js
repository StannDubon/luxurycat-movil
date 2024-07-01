import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

export default function Sesion({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [correo, setCorreo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handlerRegistro = async () => {
    try {
        const form = new FormData();
        form.append("usuario_nombre", nombre);
        form.append("usuario_apellido", apellido);
        form.append("usuario_usuario", usuario);
        form.append("usuario_contraseña", contrasenia);
        form.append("usuario_correo", correo);
        form.append("usuario_estado", 1);
        form.append("confirmar_contraseña", confirmarContrasenia);

      const DATA = await fetchData("cliente", "signUpMovil", form);
      if (DATA.status) {
        // Navega a la siguiente pantalla o ruta en la aplicación
        await handlerLogin();
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

  const handlerLogin = async () => {
    try {
      // Crea un formulario FormData con los datos de usuario y contraseña
      const form = new FormData();
      form.append("usuario_usuario", usuario);
      form.append("usuario_contraseña", contrasenia);

      // Realiza una solicitud para iniciar sesión usando fetchData
      const DATA = await fetchData("cliente", "logIn", form);
        console.log(DATA)
      // Verifica la respuesta del servidor
      if (DATA.status) {
        Alert.alert("Bienvenido!", "Cuenta registrada satisfactoriamente");
        setContrasenia("");
        setUsuario("");
        setApellido("");
        setNombre("");
        setCorreo("");
        setConfirmarContrasenia("");  
        navigation.replace("Navigator");
      } else {
        // Muestra una alerta en caso de error
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      // Maneja errores que puedan ocurrir durante la solicitud
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // o el valor de desplazamiento adecuado
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // restablecer el valor de desplazamiento
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigateSesion = async () => {
    navigation.replace("Sesion")
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../../src/img/wallpaper1.png")}
          style={styles.decorator}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </ImageBackground>
        <View style={[styles.mainContainer, keyboardVisible && { marginTop: -30 }]}>
          <Text style={styles.LargeText}>¡Regístrate!</Text>
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
          <Input
            placeHolder="Contraseña"
            setValor={contrasenia}
            setTextChange={setContrasenia}
            contra={true}
          />
          <Input
            placeHolder="Confirmar Contraseña"
            setValor={confirmarContrasenia}
            setTextChange={setConfirmarContrasenia}
            contra={true}
          />
          <Text style={styles.devider}></Text>
          <Buttons textoBoton="¡Regístrate!" accionBoton={handlerRegistro} />
          <TouchableOpacity style={styles.textPositioner}>
            <Text style={styles.buttonText} onPress={navigateSesion}>
              ¿Ya tienes cuenta? Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  decorator: {
    height: 300,
    width: "100%",
    position: "relative",
  },
  image: {
    width: 200,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -130 }],
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  LargeText: {
    fontSize: 35,
    fontFamily: "FuturaMedium",
    marginTop: 13,
    marginBottom: 25,
  },
  textPositioner: {
    marginTop: 25,
  },
  buttonText: {
    fontFamily: "FuturaMedium",
    marginBottom: 20,
    fontSize: 20,
  },
  texto: {
    color: "#322C2B",
    fontWeight: "900",
    fontSize: 20,
  },
  textRegistrar: {
    color: "#322C2B",
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginTop: -150,
    borderTopLeftRadius: 60,
  },
  devider: {
    marginTop: 10,
  },
});
