import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,Alert} from "react-native";
import fetchData from "../utils/fetchdata";
import * as constantes from '../utils/constantes';
import { useNavigation } from "@react-navigation/native";
import Buttons from '../components/Buttons/Button';

export default function ProductoInfoScreen({ route }) {
  const { idProducto } = route.params;
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const form = new FormData();
      form.append("idProducto", idProducto);
      const DATA = await fetchData("producto", "readOne", form);
      if (DATA.status) {
        const producto = DATA.dataset;
        setDescripcion(producto.producto_descripcion);
        setNombre(producto.producto_nombre);
        setPrecio(producto.producto_precio);
        setImagen(producto.producto_imagen);
        setCantidad(producto.producto_cantidad);
      } else {
        console.log("Data en el ELSE error productos", DATA);
        Alert.alert("Error productos", DATA.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert("Error", "Ocurrió un error al listar los productos");
    }
  };

  
  const agregarAlCarrito = async () => {
    try {
      const FORM = new FormData();
      FORM.append("idProducto", idProducto);
      FORM.append("cantidadProducto", 1);
      const data = await fetchData('pedido', 'createDetail', FORM);
      if (data.status) {
        Alert.alert("Agregado al carrito con exito");
      } else {
        Alert.alert("Error al agregar productos al carrito");
      }
    } catch (error) {
      Alert.alert("Error al ejecutar la petición: " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.regresar} onPress={() => {navigation.goBack();}}>{"< Regresar"}</Text>
      <View style={styles.productoContainer}>
        <Image source={{ uri: `${constantes.IP}/luxurycat/luxurycat-web/API/images/productos/${imagen}` }} style={styles.imagenProducto} />
        <Text style={styles.nombreProducto}>{nombre}</Text>
        <Text style={styles.descripcionProducto}>{descripcion}</Text>
        <Text style={styles.precioProducto}>Precio: ${precio}</Text>
        <Text style={styles.cantidadProducto}>Cantidad disponible: {cantidad}</Text>
        <Buttons textoBoton="Comprar" accionBoton={agregarAlCarrito} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#ffffff",
    },
    regresar: {
      fontSize: 16,
      marginBottom: 40,
      color: "#007bff", // color azul
    },
    productoContainer: {
      alignItems: "center",
    },
    imagenProducto: {
      width: 200,
      height: 200,
      marginBottom: 10,
      borderRadius: 10,
    },
    nombreProducto: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    descripcionProducto: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: "center",
    },
    precioProducto: {
      fontSize: 18,
      marginBottom: 10,
    },
    cantidadProducto: {
      fontSize: 16,
      marginBottom: 10,
    },
  });