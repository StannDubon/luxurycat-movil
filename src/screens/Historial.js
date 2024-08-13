import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Alert } from 'react-native';
import fetchData from '../utils/fetchdata';
import { Card } from 'react-native-paper';


// Definimos el componente funcional Home.
export default function Home({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]); // Estado para guardar los productos del pedido

  // Función para obtener el historial del cliente.
  const fetchHistorialData = async () => {
    try {
      const historialResponse = await fetchData('pedido', 'getHistory');
      console.log('Historial de compras:', historialResponse);

      if (historialResponse && historialResponse.status === 1 && historialResponse.dataset) {
        setPedidos(historialResponse.dataset);

        // Imprimir el id_pedido de cada pedido en el historial
        const pedidoIds = historialResponse.dataset.map(pedido => pedido.pedido_id);

        // Fetch productos para todos los pedidos
        const productosPromises = pedidoIds.map(async (idPedido) => {
          try {
            const form = new FormData();
            form.append("idPedido", idPedido);
            const DATA = await fetchData("pedido", "getHistoryProducts", form);
            console.log('Productos del pedido:', DATA);

            if (DATA.status) {
              // Aquí puedes actualizar el estado de productos
              return {
                pedidoId: idPedido,
                productos: DATA.dataset || [] // Asegúrate de que sea una lista
              };
            } else {
              console.log(DATA.error);
              Alert.alert("Error", DATA.error);
              return null;
            }
          } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener productos del pedido');
            console.error('Error al obtener productos:', error);
            return null;
          }
        });

        // Espera a que todas las promesas se resuelvan
        const productosData = await Promise.all(productosPromises);
        setProductos(productosData.filter(data => data !== null)); // Filtra los resultados nulos
      } else {
        setPedidos([]); // Asegúrate de limpiar el estado si no se encuentran datos
        console.log('No se encontraron datos de historial de compras');
      }
    } catch (error) {
      console.error('Error al obtener el historial de compras:', error);
      setPedidos([]); // Limpia el estado en caso de error
    }
  };

  useEffect(() => {
    fetchHistorialData();
  }, []);

  // Renderiza una fila del FlatList.
  const renderPedido = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={`Pedido #${item.pedido_id}`} />
      <Card.Content>
        <Text style={styles.texts}>{`${item.usuario_nombre} ${item.usuario_apellido}`}</Text>
        <Text style={styles.text}>{item.pedido_fechaSolicitud}</Text>
        <Text style={styles.text}>Dirección: {item.pedido_direccion}</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.texts, styles.tableColumn]}>Producto</Text>
          <Text style={[styles.texts, styles.tableColumn]}>Cantidad</Text>
          <Text style={[styles.texts, styles.tableColumn]}>Precio</Text>
          <Text style={[styles.texts, styles.tableColumn]}>Subtotal</Text>
        </View>

        {/* Aquí se mostrarán los detalles del pedido */}
        {productos.map((productoData) => (
          productoData.pedidoId === item.pedido_id && productoData.productos.map((producto, index) => {
            // Convertir el precio y el subtotal a números
            const precio = parseFloat(producto.detalle_precio) || 0;
            const cantidad = producto.detalle_cantidad || 0;
            const subtotal = precio * cantidad;

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.text, styles.tableColumn]}>{producto.producto_nombre}</Text>
                <Text style={[styles.text, styles.tableColumn]}>{cantidad}</Text>
                <Text style={[styles.text, styles.tableColumn]}>
                  {precio.toFixed(2)}
                </Text>
                <Text style={[styles.text, styles.tableColumn]}>
                  {subtotal.toFixed(2)}
                </Text>
              </View>
            );
          })
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>TOTAL: ${parseFloat(item.precio_total).toFixed(2)}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  // Renderizamos el componente.
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../src/img/wallpaper2.png")}
        style={styles.decorator}
      >
        <View style={styles.centeredContainer}>
          <Text style={styles.decoratorText}>Historial</Text>
        </View>
      </ImageBackground>

      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={item => item.pedido_id.toString()}
        contentContainerStyle={styles.mainContainer}
      />
    </View>
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  decorator: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 180,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  decoratorText: {
    fontSize: 35,
    color: "white",
    marginTop: 45,
    fontFamily: "FuturaMedium",
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  card: {
    marginVertical: 10,
    width: 400,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  texts: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  tableColumn: {
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
