// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados y funciones utilitarias.
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

// Definimos el componente funcional Sesion que recibe la navegación como una prop.
export default function Sesion({ navigation }) {
  // Definimos estados locales para manejar el correo electrónico y la visibilidad del teclado.
  const [correo, setCorreo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Función asincrónica para manejar el envío del correo electrónico.
  const handlerEmailSender = async () => {
    try {
      // Creamos un FormData con el correo electrónico del usuario.
      const form = new FormData();
      form.append("usuario_correo", correo);
      
      // Hacemos una solicitud usando fetchData para enviar el correo electrónico y recibir una respuesta.
      const DATA = await fetchData("cliente", "emailPasswordSender", form);
      // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos el correo, mostramos una alerta y navegamos a la siguiente pantalla.
      if (DATA.status) {
        setCorreo("");
        Alert.alert("Éxito", "Un código de verificación ha sido enviado a su correo electrónico");
        const token = DATA.dataset;
        navigation.replace("CambioContra2", { token });
      } else {
        // En caso de error, mostramos un mensaje de error en una alerta.
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      // Capturamos y manejamos errores que puedan ocurrir durante la solicitud.
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  // Efecto de useEffect para manejar la visibilidad del teclado.
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Actualizamos el estado cuando el teclado se muestra.
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Actualizamos el estado cuando el teclado se oculta.
      }
    );

    // Removemos los listeners al desmontar el componente para evitar memory leaks.
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Renderizamos el componente con KeyboardAvoidingView para manejar el comportamiento del teclado según la plataforma.
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
          <Text style={styles.LargeText}>¡Ingresa tu correo!</Text>
          <Input
            placeHolder="Correo"
            setValor={correo}
            setTextChange={setCorreo}
          />
          <Buttons textoBoton="Siguiente >" accionBoton={handlerEmailSender} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos del componente.
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
