import React, { useEffect, useState } from "react";
import { TouchableOpacity} from 'react-native';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import fetchData from "../utils/fetchdata";
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";

export default function Sesion({ navigation }) {
  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  // Función para validar la sesión del usuario al cargar el componente
  const validarSesion = async () => {
    try {
      // Realizar una solicitud para verificar la sesión del usuario
      const DATA = await fetchData("cliente", "getUser");
      if (DATA.session) {
        // Limpiar los campos de usuario y contraseña si hay una sesión activa
        setContrasenia("");
        setUsuario("");
        // Navegar a la pantalla principal de la aplicación
        navigation.replace("Navigator");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      // Capturar y manejar errores durante la solicitud
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al validar la sesión");
    }
  };

  // Función para cerrar la sesión del usuario
  const cerrarSesion = async () => {
    try {
      // Realizar una solicitud para cerrar sesión
      const DATA = await fetchData("cliente", "logOut");

      if (DATA.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log("No se pudo eliminar la sesión");
      }
    } catch (error) {
      // Capturar y manejar errores durante la solicitud
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión con bryancito");
    }
  };

  // Función para manejar el inicio de sesión
  const handlerLogin = async () => {
    try {
      // Crear un FormData con los datos de usuario y contraseña
      const form = new FormData();
      form.append("usuario_usuario", usuario);
      form.append("usuario_contraseña", contrasenia);

      // Realizar una solicitud para iniciar sesión usando fetchData
      const DATA = await fetchData("cliente", "logIn", form);

      // Verificar la respuesta del servidor
      if (DATA.status) {
        // Limpiar los campos de usuario y contraseña
        setContrasenia("");
        setUsuario("");
        // Navegar a la pantalla principal de la aplicación
        navigation.replace("Navigator");
      } else {
        // Mostrar una alerta en caso de error durante el inicio de sesión
        console.log(DATA);
        Alert.alert("Error sesión", DATA.error);
      }
    } catch (error) {
      // Manejar errores que puedan ocurrir durante la solicitud
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión");
    }
  };

  // Función para navegar a la pantalla de registro
  const navigateRegistrar = async () => {
    navigation.replace("Registro")
  };

  // Función para navegar a la pantalla de cambio de contraseña
  const navigateCambioContra = async () => {
    navigation.replace("CambioContra1")
  };

  // Efecto para validar la sesión del usuario al cargar el componente
  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <>
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

        <View style={styles.mainContainer}>
          <Text style={styles.LargeText}>Bienvenido!</Text>

          <Input
            placeHolder="Usuario"
            setValor={usuario}
            setTextChange={setUsuario}
          />
          <Input
            placeHolder="Contraseña"
            setValor={contrasenia}
            setTextChange={setContrasenia}
            contra={true}
          />
          <TouchableOpacity onPress={navigateCambioContra}>
            <Text style={styles.buttonText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <Buttons textoBoton="Iniciar Sesión" accionBoton={handlerLogin} />
          <TouchableOpacity style={styles.textPositioner} onPress={navigateRegistrar}>
            <Text style={styles.buttonText}>¿No tienes cuenta? Registrate</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
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
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center"
  },

  LargeText: {
    fontSize: 35,
    fontFamily: "FuturaMedium",
    marginTop: 30,
    marginBottom: 60,
  },

  textPositioner: {
    marginTop: 140
  },

  buttonText: {
    fontFamily: 'FuturaMedium',
    marginBottom: 20,
    fontSize: 20
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
    marginTop: -90,
    borderTopLeftRadius: 60,
  },
});
