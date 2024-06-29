
import { StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Input({placeHolder, setValor, contra, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#707070'}
    secureTextEntry={contra} 
    onChangeText={setTextChange}
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor:'#A7927700',
    color: "#000", fontWeight:'800',
    width:250,
    borderRadius:1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical:10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000"
  },

});