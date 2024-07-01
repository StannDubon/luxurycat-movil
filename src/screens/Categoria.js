import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert , FlatList } from "react-native";
import Producto from '../components/cards/producto';
import * as constantes from '../utils/constantes';
import fetchData from "../utils/fetchdata";
import { useNavigation } from "@react-navigation/native";

export default function CategoriaScreen({ route }) {
  const { idCategoria } = route.params;
  const [dataProductos, setDataProductos] = useState([])
  const [nombre, setNombre] = useState("");
  const navigation = useNavigation();

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

  useEffect(() => {
    getData();
    getProductos();
  }, []);

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
