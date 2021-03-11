
import React, {Component} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import { TextInputMask } from 'react-native-masked-text';
import { Row } from 'native-base';

class LoginScreen extends Component{

  state = { cpf: '', usuarios: [], num: '', nome: ''};

  verificar = async (cpf) => {
    const apiCall = await fetch('https://sensoryifrn.herokuapp.com/api/avaliador/findByCpf/'+cpf)
    .then((response)=> response.json())
    .then((responseData)=>{
      if(responseData.cpf == cpf){
        this.state.nome = responseData.nome;
        this.Verificarlogin(responseData.nome, responseData.cpf);
        this.props.navigation.navigate('Home'); 

      } else if(this.cpfField.isValid()==false){
        Alert.alert(
          "",
          "Informe um valor válido!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      }  
    })
    .catch((error) =>{
      Alert.alert(
        "",
        "Não foi possível realizar o login. Conecte-se com a internet e/ou efetue o cadastro.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    });   
  }
  
     
  Verificarlogin = async (nome, cpf) => {
    await AsyncStorage.setItem('nome', JSON.stringify(nome));
    await AsyncStorage.setItem('cpf', JSON.stringify(cpf)); 
  };

  render() {
    return (
      <View style={styles.container}>
       <ImageBackground source={require('../img/sensory-imagem.png')} style={{width: '100%', height: '100%'}}>
      <View style={styles.containerImage}>
      <Image style={styles.logo} source={require('../img/icons8-maçã-64.png')}/>
      <View style={styles.containerText}>
      <Text style={styles.text}>Sensory </Text>
      </View>
      </View>
      <View style={styles.containerComponents}>
      <View style={styles.containerInput}>
        <TextInputMask style={styles.input}
            type={'cpf'}
            value={this.state.cpf}
            placeholder='CPF'
            placeholderTextColor = "#A9A9A9"
            onChangeText={text => {
              this.setState({
                cpf: text
              })
            }}
            ref={(ref) => this.cpfField = ref}      
          />
      </View>
      <View style={styles.containerButton}>
      <TouchableOpacity style={styles.buttonCreate} onPress={() => this.verificar(this.state.cpf)}>
        <Text style={styles.buttonOptions}>Entrar</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.containerButton3}>
      <TouchableOpacity style={styles.buttonLogin} onPress={() =>  this.props.navigation.navigate('Cadastro')}>
      <Text style={styles.buttonOptions}>Criar conta</Text>
      </TouchableOpacity>
      
            
      <View style={styles.sobre} >
      <Text style={{color:'white'}} 
      onPress={() =>  this.props.navigation.navigate('TelaSobre')}>
            Sobre o Aplicativo
      </Text>
      </View>
            
      </View>




      </View>
      </ImageBackground>
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInput: {
    marginTop: 5,
  },
   input: {
    alignItems: 'stretch',
    height: 45,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 1,

  },

  buttonOptions: {
    color: 'white',
  },
  buttonLogin: {
    padding: 12,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 12,
    height: 45,
  },
  buttonCreate: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 12,
    height: 45,
    backgroundColor: '#3CB371',
  },
  containerButtonOptions: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  containerImage: {
    marginTop: 70,
    marginBottom: 5,
    alignItems: 'center',
    borderRadius: 200,
    marginLeft: 100,
    marginRight: 70,
    flexDirection: 'row',
  },
  logo: {
    marginTop: 55,
    marginBottom: 30,
    height: 50,
    width: 50,
  },
  containerComponents:{
    marginBottom: 120,
    marginTop: 20,
  },
  containerButton3: {
    marginTop: 80,
  },
  text: {
    fontSize: 28,
    color: 'white',
  }, 
  containerText:{
    marginTop: 53,
    marginLeft: 5,
  },
  sobre:{
    color: 'white',
    width: '100%',
    textAlign: "center",
    flexDirection: 'row',
    marginTop: 220,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
  }
});