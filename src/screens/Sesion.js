import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import Input from "../components/Inputs/Input";
import Buttons from "../components/Buttons/Button";
import fetchData from "../utils/fetchdata"; // Asegúrate de que el path sea correcto

export default function Sesion({ navigation }) {
  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const validarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "getUser");
      if (DATA.status === 1) {
        cerrarSesion();
        console.log("Se eliminó la sesión");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al validar la sesión");
    }
  };

  const cerrarSesion = async () => {
    try {
      const DATA = await fetchData("cliente", "logOut");

      if (DATA.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log("No se pudo eliminar la sesión");
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al iniciar sesión con bryancito");
    }
  };

  const handlerLogin = async () => {
    try {
        // Crea un formulario FormData con los datos de usuario y contraseña
        const form = new FormData();
        form.append("usuario_correo", usuario);
        form.append("usuario_contraseña", contrasenia);

        // Realiza una solicitud para iniciar sesión usando fetchData
        const DATA = await fetchData("cliente", "logIn", form);
        console.log(DATA);

        // Verifica la respuesta del servidor
        if (DATA.status) {
            // Limpia los campos de usuario y contraseña
            setContrasenia("");
            setUsuario("");
            // Navega a la siguiente pantalla o ruta en la aplicación
            navigation.navigate("TabNavigator");
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
    validarSesion();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Iniciar Sesión</Text>
      <Input
        placeHolder="Usuario"
        setValor={usuario}
        setTextChange={setUsuario}
      />
      <Input
        placeHolder="Contraseña"
        setValor={contrasenia}
        setTextChange={setContrasenia}
        contra={isContra}
      />
      <Buttons textoBoton="Iniciar Sesión" accionBoton={handlerLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    alignItems: "center",
    justifyContent: "center",
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
  image: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
});
