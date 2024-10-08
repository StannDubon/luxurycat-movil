// Importamos los componentes necesarios de React y React Native, así como algunos componentes personalizados y funciones utilitarias.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import fetchData from '../utils/fetchdata';
import Buttons from '../components/Buttons/Button';

// Definimos el componente funcional Carrito que recibe la navegación como prop.
export default function Carrito({ navigation }) {
  // Definimos estados locales para manejar los elementos del carrito, carga, dirección y total.
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [direccion, setDireccion] = useState("");
  const [total, setTotal] = useState(0);

  // Función asincrónica para obtener los elementos del carrito desde el servidor.
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const DATA = await fetchData('pedido', 'readDetail');
      if (DATA.status) {
        setCartItems(DATA.dataset);
        calculateTotal(DATA.dataset);
      } else {
        console.log(DATA.error);
        if(DATA.error == "No existen productos en el carrito"){
          setTotal(0);
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener los elementos del carrito');
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular el total basado en los elementos del carrito.
  const calculateTotal = (items) => {
    let totalAmount = 0;
    items.forEach(item => {
      const precio = parseFloat(item.detalle_precio);
      const cantidad = parseInt(item.detalle_cantidad);
      console.log(`Producto: ${item.producto_nombre}, Precio: ${precio}, Cantidad: ${cantidad}`);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        totalAmount += precio * cantidad;
      }
    });
    console.log(`Total calculado: ${totalAmount}`);
    setTotal(totalAmount);
  };

  // Función asincrónica para eliminar un elemento del carrito por su ID.
  const removeItem = async (id) => {
    try {
      const FORM = new FormData();
      FORM.append('idDetalle', id);
      const DATA = await fetchData('pedido', 'deleteDetail', FORM);
      if (DATA.status) {
        Alert.alert('Éxito', DATA.message);
        setLoading(true);
        setCartItems([]);
        fetchCartItems();
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el elemento');
    }
  };

  // Función asincrónica para actualizar la cantidad de un elemento del carrito por su ID.
  const updateItemQuantity = async (id, quantity) => {
    try {
      const FORM = new FormData();
      FORM.append('idDetalle', id);
      FORM.append('cantidadProducto', quantity);
      const DATA = await fetchData('pedido', 'updateDetail', FORM);
      if (DATA.status) {
        console.log(DATA.message);
        setLoading(true);
        fetchCartItems();
      } else {
        console.log(DATA.error)
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la cantidad');
    }
  };

  // Función asincrónica para finalizar la compra.
  const finishOrder = async () => {
    if (!cartItems.length == 0) {
      Alert.alert(
        'Confirmación',
        '¿Está seguro de finalizar el pedido?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const FORM = new FormData();
                FORM.append('direccion', direccion);
                const DATA = await fetchData('pedido', 'finishOrder', FORM);
  
                if (DATA.status) {
                  setDireccion("");
                  Alert.alert('Éxito', DATA.message, [{ text: 'OK', onPress: () => navigation.navigate('Home') }]);
                  setLoading(true);
                  setCartItems([]);
                  fetchCartItems();
                } else {
                  Alert.alert('Error', DATA.error);
                }
              } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Ocurrió un error al finalizar el pedido');
              }
            },
          },
        ]
      );
    } else {
      Alert.alert('Error', 'El carrito está vacío');
    }
  };

  // Efecto para cargar los elementos del carrito al montar el componente.
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Efecto para recargar los elementos del carrito cuando el componente está enfocado.
  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, [])
  );

  // Renderizamos el indicador de carga si loading es verdadero.
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Función para renderizar cada elemento del carrito.
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.producto_nombre}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.detalle_pedido_id, parseInt(item.detalle_cantidad, 10) - 1)} disabled={item.detalle_cantidad <= 1}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.detalle_cantidad}</Text>
        <TouchableOpacity onPress={() => updateItemQuantity(item.detalle_pedido_id, parseInt(item.detalle_cantidad, 10) + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.detalle_pedido_id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderizamos el componente principal del carrito.
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carrito</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.detalle_pedido_id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>El carrito está vacío</Text>}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Dirección de envío:</Text>
        <TextInput 
          style={styles.addressInput} 
          value={direccion} 
          onChangeText={text => setDireccion(text)} 
        />
        <Text style={styles.totalText}>TOTAL: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={finishOrder}>
          <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos del componente.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#007BFF',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  deleteButton: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  addressInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
