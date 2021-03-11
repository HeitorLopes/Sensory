
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Picker, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import { TextInputMask } from 'react-native-masked-text';
import TeamsApi from '../screens/TeamsApi';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class Avaliacao extends Component {

    state={
        cpf: '',
        id: '',
        numero: '',
        resposta: '',
        quesitos: [],
        analises: [],
        cont: 0,
      }

 render(){
  return (
       <TouchableOpacity onPress={()=>{ this.props.navigation.navigate("Agradecimento") }}>
            <Text>Continuar</Text>
       </TouchableOpacity> 
  );
};
}

export default Avaliacao;
