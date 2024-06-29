import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Buttons from '../components/Buttons/Button';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenid@</Text>
      <Text style={styles.subtitle}>
      </Text>
      <Buttons
        textoBoton='Cerrar Sesión'
      />

      <Buttons
        textoBoton='Ver Productos'
      />
      <Buttons
        textoBoton='Editar Usuario'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue"
  },
  buttonText: {
    textAlign: 'center',
    color: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
});