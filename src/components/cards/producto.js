import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de
//productoCard

export default function producto({
  ip,
  imagenProducto,
  idProducto,
  nombreProducto,
  categoriaProducto,
  precioProducto,
}) {
  return (
    <TouchableOpacity style={[styles.card, styles.horizontalCard]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${ip}/luxurycat/api/images/productos/${imagenProducto}`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.horizontalTextContainer}>
        <Text style={styles.textTitle}>{nombreProducto}</Text>
        <Text style={styles.text}>{categoriaProducto}</Text>
        <Text style={[styles.textTitle, styles.horizontalPrecio]}>
          Precio: <Text style={styles.textDentro}>${precioProducto}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%"
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  textDentro: {
    color: "#007bff", // Color azul para el precio
  },
  horizontalPrecio: {
    marginTop: 5,
  },
});
