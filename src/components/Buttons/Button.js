
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderColor: "#000",
        width: 200,
        borderRadius: 8,
        backgroundColor: "#000",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF",
        textTransform: 'uppercase',
        fontFamily: 'FuturaHeavy'
    }
});