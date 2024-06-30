import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import fetchData from "../utils/fetchdata";
import Input from "../components/Inputs/Input";
import BgButton from "../components/Buttons/BgButton";

export default function Sesion({ navigation }) {
  const [dataCategorias, setDataCategorias] = useState([]);

  const getCategorias = async () => {
    try {
      const DATA = await fetchData("categoria", "readAll");
      if (DATA.status) {
        setDataCategorias(DATA.dataset);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
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
        <Text style={styles.LargeText}>Nuestras Categorias</Text>

        <FlatList
          style={styles.flatlist}
          data={dataCategorias}
          keyExtractor={(item) => item.categoria_id}
          numColumns={2} // Establecer dos columnas
          columnWrapperStyle={styles.flatlistColumnWrapper} // Estilo para el contenedor de columnas
          renderItem={({ item }) => (
            <BgButton
              texto={item.categoria_nombre}
              id={item.categoria_id}
              navigation={navigation}
            />
          )}
        />
      </View>
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
    backgroundColor: "#fff",
    alignItems: "center",
  },

  LargeText: {
    fontSize: 25,
    fontFamily: "FuturaMedium",
    marginTop: 30,
    marginBottom: 30,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    marginTop: -90,
    borderTopLeftRadius: 60,
  },
  flatlist: {
    width: '90%',
    paddingHorizontal: 10,
  },
  flatlistColumnWrapper: {
      justifyContent: 'space-between',
  },
});
