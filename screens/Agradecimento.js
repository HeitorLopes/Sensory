
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';


export default class Agradecimento extends React.Component {

render() {

    console.disableYellowBox = true;

return (
    <View style={styles.container}>
    <Text style={styles.paragraph}>
          Agradecemos a sua avaliação!
    </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
    </View>
        );
    }
}


const styles =
StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#3CB371',
        borderColor: '#98FB98',
        padding: 16,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        width: 250,
        height: 30,
        justifyContent: 'center',
    },
});