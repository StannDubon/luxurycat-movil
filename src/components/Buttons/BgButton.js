
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';

export default function Buttons({ texto, id, navigation }) {
    return (
        <>
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate('Categoria', { id })}
            >
                <Text style={styles.buttonText}>{texto}</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "48%",
        borderRadius: 8,
        paddingVertical: 20,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        textTransform: 'uppercase',
        fontFamily: 'FuturaHeavy'
    }
});
