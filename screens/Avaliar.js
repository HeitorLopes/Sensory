
import React, {Component} from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, Picker, ImageBackground, Alert, AlertTitle, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import { TextInputMask } from 'react-native-masked-text';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingModal from '../components/LoadingModal';
export default class CadastroScreen extends Component {
  
state={
    cpf: '',
    id: '',
    numero: '',
    quesito: '',
    quesitos: [],
    analises: [],
    cont: 0,
    continuar: 0,
    tamanho: '', 
    modalVisible: false,
  }

  async componentDidMount(){
    cpf = JSON.parse(await AsyncStorage.getItem('cpf')) || [];
    this.setState({cpf});

    tamanho = JSON.parse(await AsyncStorage.getItem('tamanho')) || [];
    this.setState({tamanho});
   

    id = JSON.parse(await AsyncStorage.getItem('id')) || [];
    this.setState({id});
  quesitos = JSON.parse(await AsyncStorage.getItem('quesitos')) || [];
    this.setState({quesitos});

  };


  addResposta = async (inCpf, inId, InNumAmostra, inQuesito, inResposta) => {

     const apiCall = await fetch('https://sensoryifrn.herokuapp.com/api/analisesensorial/addResposta/'+inCpf+'/'+inId+'/'+InNumAmostra+'/'+inQuesito+'/'+inResposta,{ 
     
     method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              resposta: inResposta
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

  formularPergunta = () => {
    if(this.state.cont!=this.state.tamanho){
      this.state.quesito = this.state.quesitos[this.state.cont];
      return  <Text>{this.state.quesitos[this.state.cont]}:</Text>
    } 
  }
 
  formularTexto = () => {
    if(this.state.cont!=this.state.tamanho){
      return <Text>Avalie o quesito </Text>
    } 
  }

  inserirNumero = () => {
   if(this.state.continuar==0){
    return <View style={styles.containerInput}>
    <Text style={styles.textInput}>Número da amostra: </Text>
     {/*  {this.pegarQuesitos()} */}
      <TextInput
          style={styles.input}
          value={this.state.numero}
          autoFocus
          required
          keyboardType={'numeric'}
          onChangeText={numero => this.setState({numero})}
      />
    </View>
   } else{
    return <View style={styles.containerInput}>
    <Text style={styles.textInput}>Número da amostra: </Text>
     {/*  {this.pegarQuesitos()} */}
      <TextInput
          style={styles.input}
          value={this.state.numero}
          autoFocus
          required
          keyboardType={'numeric'}
          onChangeText={numero => this.setState({numero})}
          editable = {false}
      />
    </View>
   }
  }

  proximaPagina = () => {
    if(this.state.tamanho>0 && this.state.tamanho==this.state.cont){
      return this.props.navigation.navigate('Agradecimento');
    }
  }

  retornarAvaliacao = (radio_props) => {
      return  <RadioForm 
      radio_props={radio_props}
      initial={-1}
      labelStyle={{fontSize: 16, color: 'black'}}
      onPress={(value) => {this.setState({resposta:value})}}
      buttonColor={'#50C900'}
      labelColor={'#50C900'}
      activeBgColor={'#50C900'} />
  }

  incrementar =  () => {
      this.setState({
        cont: this.state.cont + 1,
      }); 
   };

   LoadingModal(){
    if (this.state.quesito==""){
      this.state.modalVisible = true;
    }else{
      this.state.modalVisible = false;
    }
  }

  chamarLoading(){
    var timeout1 = setTimeout(() => {
     this.state.modalVisible=true;
    }, 100);

    return timeout1;
  }

  render() {
   
    const  radio_props = [
        {label: 'Gostei extremamente', value: 1},
        {label: 'Gostei muito', value: 2},
        {label: 'Gostei moderadamente', value: 3},
        {label: 'Gostei pouco', value: 4},
        {label: 'Indiferente', value: 5},
        {label: 'Desgostei pouco', value: 6},
        {label: 'Desgostei moderadamente', value: 7},
        {label: 'Desgostei muito', value: 8},
        {label: 'Desgostei extremamente', value: 9},
    ]
    return (
      <View style={styles.container}>
        
      <ScrollView>
      {this.LoadingModal()}
      <View style={styles.containerImage}>
        <Image style={styles.logo} source={require('../img/icons8-maçã-64(1).png')}/>
        <View style={styles.containerText}>
        <Text style={styles.text}>Sensory</Text>
        </View> 
      </View>
   
    
      {this.inserirNumero()}

      <View style={styles.containerPergunta}>
        <Text style={styles.texto}>{this.formularTexto()}</Text> 
        <Text  style={styles.texto2}>{this.formularPergunta()}</Text>
      </View>
      <View style={styles.containerRadio}>
     
        {this.retornarAvaliacao(radio_props)}
        {this.proximaPagina()}
      </View>
      <View style={styles.viewBotao}>
       <TouchableOpacity onPress={()=>{{
         if(this.state.cont!=this.state.quesitos.length && this.state.resposta!=null && this.state.numero!=""){      
          Alert.alert(
            "",
            "Resposta recebida com sucesso!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      

          const apiCall = fetch('https://sensoryifrn.herokuapp.com/api/analisesensorial/addResposta/'+this.state.cpf+'/'+this.state.id+'/'+this.state.numero+'/'+this.state.quesito+'/'+this.state.resposta.toString());
           this.incrementar(); 
           this.state.continuar = 1;
           this.chamarLoading();
         } else if(this.state.numero==""){
            Alert.alert(
              "",
              "Por favor, informe o número da amostra!",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ],
              { cancelable: false }
            );
         }
         else if(this.state.resposta==null){
          Alert.alert(
            "",
            "Por favor, avalie o quesito informado!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
          }
        }
      }
      }>
        
         <Text style={styles.botao}>Continuar</Text>
       </TouchableOpacity>
       </View>
       </ScrollView>
       <LoadingModal visible={this.state.modalVisible}/>
     
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',    
  },
  containerImage: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  logo: {
    marginTop: 6,
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 40,
    color: '#3CB371',
    marginTop: 10,
    marginBottom: 10,
  }, 
  containerText:{
    marginTop: 9,
    marginLeft: 3,
  },
  containerInput:{
    marginLeft: 3,
    flexDirection: 'row',
  },
  textInput:{
    padding: 20,
    fontSize: 16,
    marginLeft: 3,
    color: 'black',
  },
  texto:{
    fontSize: 18,
    fontStyle: 'italic',
    marginLeft: 3,
    color: 'black',
    fontFamily: 'Arial',
  },
  texto2:{
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  containerPergunta:{
    padding: 20,
    marginLeft: 3,
    borderBottomColor : '#ddd',
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
  },
  input:{
     borderWidth : 1,
      borderColor : '#3CB371',
      paddingHorizontal : 20,
      color: '#444',
      height:40,
      marginBottom:20,
      borderRadius:2,
      width: 80,
      marginTop: 10,
  },
  containerRadio:{
    marginTop: 7, 
    marginLeft: 30,
    marginBottom: 7,
  },
  botao:{
    fontSize:18,
    borderRadius:15,
    padding:12,
    margin:50,
    alignSelf:'center',
    width:120,
    height:60,
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: '#3CB371',
    borderColor: '#98FB98',
    borderWidth: 1,
  },
  viewBotao:{
    borderTopColor : '#ddd',
    borderColor: 'white',
    borderWidth: 1,
  }
});

