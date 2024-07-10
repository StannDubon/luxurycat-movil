import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import fetchData from '../utils/fetchdata';
import Buttons from '../components/Buttons/Button';

export default function Carrito({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const DATA = await fetchData('pedido', 'readDetail');
      if (DATA.status) {
        setCartItems(DATA.dataset);
        console.log(cartItems);
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener los elementos del carrito');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      const FORM = new FormData();
      FORM.append('idDetalle', id);
      const DATA = await fetchData('pedido', 'deleteDetail', FORM);
      if (DATA.status) {
        Alert.alert('Éxito', DATA.message);
        fetchCartItems();
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el elemento');
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    try {
      
      const FORM = new FormData();
      FORM.append('idDetalle', id);
      FORM.append('cantidadProducto', quantity);
      const DATA = await fetchData('pedido', 'updateDetail', FORM);
      if (DATA.status) {
        Alert.alert('Éxito', DATA.message);
        fetchCartItems();
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.producto_nombre}</Text>
      <Text style={styles.itemText}>Cantidad: {item.detalle_cantidad}</Text>
      <Buttons textoBoton="Eliminar" accionBoton={() => removeItem(item.detalle_pedido_id)} />
      <Buttons textoBoton="+" accionBoton={() => updateItemQuantity(item.detalle_pedido_id, item.detalle_cantidad + 1)} />
      <Buttons textoBoton="-" accionBoton={() => item.detalle_cantidad > 1 && updateItemQuantity(item.detalle_pedido_id, item.detalle_cantidad - 1)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.detalle_pedido_id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>El carrito está vacío</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
