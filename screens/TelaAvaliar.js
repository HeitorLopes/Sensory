/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  Input,
  TextInput,
  TouchableOpacity,
  Alert,
  CheckBox,
  RadioButton,
  RadioForm,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 

class TelaAvaliar extends Component {

  cont = 0
  resposta = 0
lista = []

  escala=['Gostei extremamente',
          'Gostei muito',
          'Gostei moderadamente',
          'Gostei pouco',
          'Indiferente',
          'Desgostei pouco',
          'Desgostei moderadamente',
          'Desgostei muito',
          'Desgostei extremamente',
  ]


  listar(){
      for(let i=0;i<9;i++){
        this.lista.push( 
<View style={styles.div}>
<CheckBox style={styles.CheckBox} checked={this.state.checks[1]}></CheckBox >
<Text style={{fontSize:18,color:'black'}} onPress={()=>{ this.resposta = i }}
 
  >{this.escala[i]}</Text></View>
        );
      }
  }

state = {

    enviar : -1,

    quesitos:['COR','SABOR','TEXTURA','APARENCIA','CHEIRO'],
    quesitoAtual : 'COR',

    id : 0,
    checked: 'first',
    amostra : '',
    
    analises :[],

 

};
    


async  getAll() {
    try {
      const response = await fetch('https://sensoryifrn.herokuapp.com/api/analisesensorial/findAll');
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

async setAnalises (){
  const analises = await this.getAll();
  this.setState({analises});
}

async pegar (){
  const x  = await AsyncStorage.getItem('id');
  this.state.id = x;
  this.setState({ id: x })
  return x;
}

  render(){
  return (
  <ScrollView style={styles.scroll}>
       <View style={styles.containerImage}>
          <Image style={styles.logo} source={require('../img/icons8-maçã-64(1).png')}/>
          <View style={styles.containerText}>
          <Text style={styles.text}>Sensory</Text>
          </View>
      </View>

        <View style={{paddingBottom:10}}>
          <View style={styles.cabecalho}>
            <Text style={styles.padrao}>Nº da amostra</Text>
            <TextInput
              style={styles.input}
              placeholder = ""
              keyboardType={'numeric'}
              onChangeText={a => {this.state.amostra = a}}
            />
          </View>
         
        </View>

      <View style={styles.pergunta}>
        <Text style={styles.estiloPergunta}>Por favor, avalie o quesito {this.state.quesitoAtual}:</Text>
      </View>

    <View style={styles.viewcheck}>
      <View onPress={()=>{this.resposta = 1}} style={styles.div}><CheckBox style={styles.CheckBox} onPress={()=>{this.resposta = 1}}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 1}}>Gostei extremamente</Text></View>
      <View onPress={()=>{this.resposta = 2}} style={styles.div}><CheckBox style={styles.CheckBox} onPress={()=>{this.resposta = 2}}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 2}}>Gostei muito</Text></View>
      <View onPress={()=>{this.resposta = 3}} style={styles.div}><CheckBox style={styles.CheckBox} onPress={()=>{this.resposta = 3}}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 3}}>Gostei moderadamente</Text></View>
      <View onPress={()=>{this.resposta = 4}} style={styles.div}><CheckBox style={styles.CheckBox} onPress={()=>{this.resposta = 4}}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 4}}>Gostei pouco</Text></View>
      <View onPress={()=>{this.resposta = 5}} style={styles.div}><CheckBox style={styles.CheckBox} onPress={()=>{this.resposta = 5}}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 5}}>Indiferente</Text></View>
      <View style={styles.div}><CheckBox style={styles.CheckBox}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 6}}>Desgostei pouco</Text></View>
      <View style={styles.div}><CheckBox style={styles.CheckBox}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 7}}>Desgostei moderadamente</Text></View>
      <View style={styles.div}><CheckBox style={styles.CheckBox}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 8}}>Desgostei muito</Text></View>
      <View style={styles.div}><CheckBox style={styles.CheckBox}></CheckBox><Text style={{fontSize:18,color:'black'}} onPress={()=>{this.resposta = 9}}>Desgostei extremamente</Text></View>
      
      
          </View>


       <TouchableOpacity onPress={()=>{
         this.pegar();
       
        if(this.cont<5){
          this.cont =  this.cont+1;
          const q = this.state.quesitos[this.cont];
          const proximo = this.state.quesitos[q];
            const apiCall = fetch('https://sensoryifrn.herokuapp.com/api/analisesensorial/addResposta/111111/20/'+this.state.amostra+'/'+this.state.quesitoAtual+'/'+this.resposta.toString());
          this.setState({quesitoAtual:q});
        }else{
          this.props.navigation.navigate("Agradecimento")
        }
       }
        
       }
            >
            <Text style={styles.botao}
          
            >Continuar</Text>
       </TouchableOpacity>
        </ScrollView>  
  );
};
}

export default TelaAvaliar;

const styles = StyleSheet.create({
    titulo:{
        fontSize : 50,
        alignSelf: 'center',
        margin: 40,
        color : '#427c9e',
    },
    botao:{
        fontSize:18,
        borderRadius:15,
        padding:15,
        margin:50,
        alignSelf:'center',
        width:160,
        height:60,
        backgroundColor: '#3CB371',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center'
    },
    CheckBox:{
      paddingRight:20 ,
      paddingLeft:10,
    },  
    viewcheck:{
      flexDirection:'column',
      alignItems:'center',
      alignSelf:'center',
      marginBottom:20,
      borderWidth: 1,
      borderRadius: 20,
    },
    scroll:{
      backgroundColor: 'white',
    },
    link:{
      padding:0,
      marginLeft:18,
      height:20,
      
    },
    cabecalho:{
      flexDirection:'row',
    }, 
    padrao:{
      padding: 20,
      fontSize: 18,
      color: 'black'
    },

    pergunta:{
      padding :20,
      fontSize: 25,
  
    },
    estiloPergunta:{
      fontSize:17,
      color: 'black',
      fontStyle: 'italic',
    },
    div:{
      flexDirection:'row',
      alignSelf:'flex-start',
      margin: 4,
      padding: 20
    },
    input:{
      borderWidth : 1,
      borderColor : '#ddd',
      paddingHorizontal : 20,
      color: '#444',
      height:40,
      marginBottom:20,
      borderRadius:2,
      width: 80,
    }, 
    containerImage: {
      marginTop: 20,
      marginBottom: 20,
      alignItems: 'center',
      borderRadius: 200,
      textAlign: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    logo: {
      marginTop: 50,
      marginBottom: 20,
      height: 50,
      width: 50,
    },
    text: {
      fontSize: 40,
      color: '#3CB371',
    }, 
    containerText:{
      marginTop: 53,
      marginLeft: 5,
    }
});