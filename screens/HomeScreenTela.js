


import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, 
  SafeAreaView, Dimensions, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import Analise from '../components/Analise';
import TeamsApi from '../screens/TeamsApi';
import LoadingModal from '../components/LoadingModal';
export default class HomeScreenTela
 extends Component {
    
    state = {
      modalVisible: false,
      analises:[],
      usuarios:[],
      quesitos: [],
      codigos:[],
      cpf: '',
      nome: '',
      idAnalise: '',
    };

    async componentDidMount() {
      const analises = await TeamsApi.getAll();
      this.setState({analises});
      nome = JSON.parse(await AsyncStorage.getItem('nome')) || [];
      this.setState({nome});
    }

    salvarID = async (id, quesitos, tamanho) => {
      await AsyncStorage.setItem('id', JSON.stringify(id));
      await AsyncStorage.setItem('quesitos', JSON.stringify(quesitos));
      await AsyncStorage.setItem('tamanho', JSON.stringify(tamanho));
    };

    exibirUsuario () {
          return <Text style={{color: 'black'}} style={styles.texto}>{this.state.nome}</Text>
    }

    salvarCodigos(){
      for(var j=0; j<analise.escala.avaliacaohedonica.length; j++){
        for(var i=0; i<analise.escala.avaliacaohedonica[j].respostahedonica.length; i++){
          for(var n=0; n<analise.escala.avaliacaohedonica[j].respostahedonica[i].amostra.length; n++){
            this.state.codigos[n] = analise.escala.avaliacaohedonica[j].respostahedonica[i].amostra[n].codigo;
            alert(analise.escala.avaliacaohedonica[j].respostahedonica[i].amostra[0].codigo);
          }
        }
     }
    }

    LoadingModal(){
      if (this.state.nome==""){
        this.state.modalVisible = true;
      }else{
        this.state.modalVisible = false;
      }
    }

    render(){
        this.LoadingModal();
        return(
          <View style={styles.container}>
           <View style={styles.header}>
                <View style={styles.containerIcone}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                     <Image source={require('../img/logout.png')}  style={styles.sair}/>


                    </TouchableOpacity>
                </View>
                <View style={styles.containerTexto}>
                  <Image style={styles.logo} source={require('../img/icons8-talheres-60.png')}/>
                  <Text style={styles.textoAnalise}>Análises</Text>
               </View>
            </View>
            <Text style={styles.texto}>Olá, {this.exibirUsuario()}</Text>
            <ScrollView>
               {this.state.analises.map(analise => 
            <TouchableOpacity key={analise.id} onPress={() => {this.props.navigation.navigate('Informacoes', {alergias: analise.alergias})
  
                  {
                      for(var j=0; j<analise.escala.avaliacaohedonica.length; j++){
                      this.state.quesitos[j] = analise.escala.avaliacaohedonica[j].pergunta;
                  } 
    
                    this.salvarID(analise.id, this.state.quesitos, this.state.quesitos.length)
                  }
                 }
                
            }>
                <Analise analise={analise} descricao={analise.descricao} 
                local={analise.local} sala={analise.sala} data={analise.data} qtdAmostras={analise.qtdAmostrasDisponiveis}/>
            </TouchableOpacity>
          )}
        </ScrollView>
        <LoadingModal visible={this.state.modalVisible}/>
      </View>
        )
       
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    textoAnalise:{
      color: 'white',
      fontSize: 25,
      fontStyle: 'italic',
    },
    texto:{
      color: 'black',
      fontSize: 18,
      fontStyle: 'italic',
      marginBottom: 6,
      marginLeft: 42,
    },
    containerTexto:{
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }, 
    containerIcone: {
      marginRight: 80,
    },
    header:{
      marginTop: 0,
      marginBottom: 12,
      padding: 16,
      backgroundColor: '#3CB371',
      flexDirection: 'row',
    }, 
    footer:{
      marginTop: 0,
      marginBottom: 0,
      padding: 16,
      backgroundColor: '#3CB371',
      flexDirection: 'row',
    },
    icone:{
      height: 30,
    },
    logo:{
      height: 30,
      width: 30,
    },

    sair:{
      marginTop : 8,
      height: 25,
      width: 25,
    }
});
