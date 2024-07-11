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
import { useNavigation } from "@react-navigation/native";
import InputVerification from "../components/Inputs/InputVerification";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata";

// Definimos el componente funcional Sesion que recibe la ruta (route) como prop.
export default function Sesion({ route }) {
  // Extraemos el token de la ruta recibida como parámetro.
  const { token } = route.params;
  // Definimos estados locales para manejar el código de verificación y la visibilidad del teclado.
  const [codigo, setCodigo] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  // Obtenemos el objeto de navegación usando useNavigation.
  const navigation = useNavigation();

  // Función asincrónica para manejar la verificación del código de verificación.
  const handlerEmailVerification = async () => {
    try {
      // Creamos un FormData con el token y el código de verificación.
      const form = new FormData();
      form.append("token", token);
      form.append("codigoSecretoContraseña", codigo);
      
      // Hacemos una solicitud usando fetchData para validar el código de verificación y recibir una respuesta.
      const DATA = await fetchData("cliente", "emailPasswordValidator", form);
      // Si la solicitud es exitosa (DATA.status es verdadero), limpiamos el código, mostramos una alerta y navegamos a la siguiente pantalla.
      if (DATA.status) {
        setCodigo("");
        Alert.alert("Éxito", "Verificación Correcta");
        const tokenV = DATA.dataset;
        navigation.replace("CambioContra3", { tokenV });
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
          <Text style={styles.LargeText}>Verificación</Text>
          <InputVerification
            placeHolder="Codigo"
            setValor={codigo}
            setTextChange={setCodigo}
          />
          <Buttons textoBoton="Siguiente >" accionBoton={handlerEmailVerification} />
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
