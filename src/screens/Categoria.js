// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados y constantes.
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import Producto from '../components/cards/producto';
import * as constantes from '../utils/constantes';
import fetchData from "../utils/fetchdata";
import { useNavigation } from "@react-navigation/native";

// Definimos el componente funcional CategoriaScreen que recibe los parámetros de ruta.
export default function CategoriaScreen({ route }) {
  // Extraemos el idCategoria de los parámetros de ruta.
  const { idCategoria } = route.params;
  
  // Definimos estados locales para manejar los datos de productos, nombre de categoría y navegación.
  const [dataProductos, setDataProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const navigation = useNavigation();

  // Función asincrónica para obtener la información de la categoría.
  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idCategoria", idCategoria);
      const DATA = await fetchData("categoria", "readOne", form);
      if (DATA.status) {
        const categoria = DATA.dataset;
        setNombre(categoria.categoria_nombre);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Función asincrónica para obtener los productos de la categoría.
  const getProductos = async () => {
    try {
      const form = new FormData();
      form.append("idCategoria", idCategoria);
      const DATA = await fetchData("producto", "readByCategory", form);
      if (DATA.status) {
        setDataProductos(DATA.dataset);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  // Efecto para cargar la información de la categoría y los productos al montar el componente.
  useEffect(() => {
    getData();
    getProductos();
  }, []);

  // Renderizamos el componente principal de la pantalla de categoría.
  return (
    <View style={styles.container}>
      <Text style={styles.regresar} onPress={() => {navigation.goBack();}}>{"< Regresar"}</Text>
      <Text style={styles.MainText}>{nombre}</Text>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.scrollViewContent}
        data={dataProductos}
        keyExtractor={(item) => item.producto_id.toString()}
        renderItem={({ item }) => (
          <Producto
            ip={constantes.IP}
            imagenProducto={item.producto_imagen}
            idProducto={item.producto_id}
            nombreProducto={item.producto_nombre}
            subTitle={item.producto_descripcion}
            precioProducto={item.producto_precio}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

// Estilos del componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center"
  },
  regresar: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 40,
    color: "#007bff", // color azul
    width: "100%"
  },
  MainText: {
    fontSize: 30,
    fontFamily: 'FuturaMedium',
    marginTop: 5,
    marginBottom: 40
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'top',
  },
});
