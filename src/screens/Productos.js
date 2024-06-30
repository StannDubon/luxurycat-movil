import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView , FlatList } from "react-native";
import ProductoCard from '../components/cards/producto';
import * as constantes from '../utils/constantes';
import fetchData from "../utils/fetchdata";

export default function Home({ navigation }) {

  const [dataProductos, setDataProductos] = useState([])

  const getProductos = async () => {
    try {
      const DATA = await fetchData("producto", "readAll");
      if (DATA.status) {
        setDataProductos(DATA.dataset);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert('Error productos', DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al listar los productos');
    }
  }

  useEffect(() => {
    getProductos();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.MainText}>Todos Nuestros Productos</Text>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.scrollViewContent}
        data={dataProductos}
        keyExtractor={(item) => item.producto_id.toString()}
        renderItem={({ item }) => (
          <ProductoCard
            ip={constantes.IP}
            imagenProducto={item.producto_imagen}
            idProducto={item.producto_id}
            nombreProducto={item.producto_nombre}
            categoriaProducto={item.categoria}
            precioProducto={item.producto_precio}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center"
  },
  MainText: {
    fontSize: 30,
    fontFamily: 'FuturaMedium',
    marginTop: 30,
    marginBottom: 40
  },
  
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'top',
  },
});
