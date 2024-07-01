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
  navigation
}) {
  return (
    <TouchableOpacity style={[styles.card, styles.horizontalCard]} onPress={() => navigation.navigate('Info', { idProducto })}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${ip}/luxurycat/luxurycat-web/API/images/productos/${imagenProducto}`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.textTitle}>{nombreProducto}</Text>
        <Text style={styles.text}>{categoriaProducto}</Text>
        <Text style={styles.price}>${precioProducto}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
    position: "relative"
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
    color: "#555"
  },
  price: {
    position: "absolute",
    color: "#52C248",
    right: 8,
    top: 5
  },
  infoTextContainer:{
    flex: 1,
    justifyContent: "center",
    gap: 5,
    marginLeft: 5
  }
});
