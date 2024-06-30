
import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Animated } from 'react-native';

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColor, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#828181', '#000000']
  });

  return (
    <Animated.View style={[styles.inputContainer, { borderColor: animatedBorderColor }]}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={setValor}
        placeholderTextColor={'#828181'}
        secureTextEntry={contra}
        onChangeText={setTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 250,
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 2
  },
  input: {
    backgroundColor: '#00000000',
    color: '#000',
    fontSize: 16,
    fontFamily: 'FuturaBook'
  }
});
