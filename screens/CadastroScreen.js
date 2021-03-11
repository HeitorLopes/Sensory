

import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Picker, ImageBackground, ScrollView,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import { TextInputMask } from 'react-native-masked-text';
export default class CadastroScreen extends Component {
  
state={
    nome: '',
    cpf: '',
    idade: '',
    fumante: '', 
    sexo: '',
    usuarios: [],
  }


  verificarCPF = async () => {
    const apiCall = await fetch('https://sensoryifrn.herokuapp.com/api/avaliador/findByCpf/');
    const response = await apiCall.json();
    
    if(response.cpf == this.state.cpf || this.cpfField.isValid()==false){
      Alert.alert(
        "",
        "CPF inválido!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else if(this.state.nome=='' | this.state.sexo=='' | this.state.fumante==''){
      Alert.alert(
        "",
        "Por favor, preencha todos os dados!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } else if(this.idadeField.isValid()==false){
      Alert.alert(
        "",
        "Por favor, informe uma data válida!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else{
      this.addUsuario(this.state.nome, this.state.cpf, this.state.idade, this.state.sexo, this.state.fumante);
      Alert.alert(
        "",
        "Cadastrado com sucesso!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      this.props.navigation.navigate('Login')
    }
  }
  
  addUsuario = async (inNome, inCpf, inIdade, inSexo, inFumante) => {
    
     const apiCall = await fetch('https://sensoryifrn.herokuapp.com/api/avaliador/addNew/'+inCpf+'/'+inNome+'/'+inSexo+'/'+inIdade+'/'+inFumante,{
         method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              cpf: inCpf,
              nome: inNome,
              sexo: inSexo,
              dataNascimento: inIdade,
              fumante: inFumante
          }) 
     })
     .then((response)=> response.json())
     .then((responseData)=>{
       
     })
     .catch((error) =>{
        Alert.alert(
          "",
          "Não foi possível efetuar o cadastro. CPF já cadastrado!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
     });   
  };

  async componentDidMount(){
    usuarios = JSON.parse(await AsyncStorage.getItem('usuarios')) || [];
    this.setState({usuarios});
  };

  render() {
    return (
      <View style={styles.container}>
         <ImageBackground source={require('../img/sensory-imagem.png')} style={{width: '100%', height: '100%'}}>
         <ScrollView>
          <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Image source={require('../img/icons8-voltar-24.png')} style={styles.voltar}/>
           </TouchableOpacity>
           </View>

           <View style={styles.containerText}>
           
           <Image style={styles.logo} source={require('../img/icons8-maçã-64.png')}/>
              <Text style={styles.text}>Sensory</Text>
          </View>
      
      <View style={styles.containerInput}>
      <TextInputMask style={styles.input}
            value={this.state.cpf}
            type={'cpf'}
            autoFocus
            placeholder='CPF'
            placeholderTextColor = "#A9A9A9"
            onChangeText={cpf => this.setState({cpf})}
            ref={(ref) => this.cpfField = ref}
        />
      </View>
      <View style={styles.containerInput}>
        <TextInput style={styles.input}
            placeholder='Nome'
            value={this.state.nome}
            autoFocus
            placeholderTextColor = "#A9A9A9"
            onChangeText={nome => this.setState({nome})}
        />
      </View>
      <View style={styles.containerInput}>
        <TextInputMask style={styles.input}
            type={'datetime'}
            options={{
              format: 'DD-MM-YYYY'
            }}
            placeholder='Data de nascimento'
            value={this.state.idade}
            autoFocus
            placeholderTextColor = "#A9A9A9"
            onChangeText={idade => this.setState({idade})}
            ref={(ref) => this.idadeField = ref}
        />
      </View>
    <View style={styles.picker}> 
        <Picker
          selectedValue={this.state.fumante}
          style={{width: 180}}
          styleItem={{color: "#A9A9A9"}}
          onValueChange={(itemValue, itemIndex) =>
          this.setState({fumante: itemValue})
          }>
          <Picker.Item label="Fumante" value="" />
          <Picker.Item label="Sim" value="true" />
          <Picker.Item label="Não" value="false" />
    </Picker>
    </View>
    <View style={styles.picker}> 
        <Picker
          selectedValue={this.state.sexo}
          style={{width: 180}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({sexo: itemValue})
          }>
          <Picker.Item label="Sexo" value=""/>
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Masculino" value="Masculino" />
    </Picker>
    </View>

        <View style={styles.containerbuttom}>
          <TouchableOpacity style={styles.buttonCriar} onPress={() =>  {
            {
              this.verificarCPF();
            }  
          }
            }>
          <Text style={styles.buttonOptions}>Criar conta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bemVindo}>
          <Text style={styles.buttonOption}>Seja bem-vindo(a)!</Text>
        </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

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
    marginLeft: 14,
    marginRight: 14,
    marginTop: 5,
    marginBottom: 6,
    borderRadius: 1,
    backgroundColor: 'white',
  },
  picker: {
    alignItems: 'stretch',
    height: 45,
    marginLeft: 14,
    marginRight: 150,
    marginTop: 5,
    marginBottom: 6,
    borderRadius: 3,
    backgroundColor: 'white',

  },
  containerText: {
    flexDirection: 'row',
    marginTop: 31,
    marginBottom: 39,
    justifyContent: 'center',
    }, 
  logo: {
    height: 50, 
    width: 50,
    marginTop: 13,
  }, 
  text: {
    color: 'white',
    fontSize: 28,
    marginTop: 20,
  },
   buttonCriar: {
    padding: 16,
    borderColor: '#98FB98',
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    height: 34,
    width: 160,
    backgroundColor: '#3CB371',
    justifyContent: 'center',
  },
  buttonOptions: {
    color: 'white',
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
  },
  buttonOption: {
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,
  },
  containerbuttom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    textAlign: 'center',
  }, 
  texto:{
    color: "black",
    fontSize: 16
  },
  bemVindo:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  voltar:{
    marginTop: 12,
    marginLeft: 5,
  }
});

