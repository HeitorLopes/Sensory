
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView, 
  SafeAreaView, Dimensions, Image, ActivityIndicator, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'; 
import Analise from '../components/Analise';
import TeamsApi from '../screens/TeamsApi';
import LoadingModal from '../components/LoadingModal';
export default class HomeScreenTela extends Component {
    
    state = {};

    render(){
        
        return(
          <View style={styles.container}>
           <View style={styles.header}>
                <View style={styles.containerIcone}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    
                     <Image source={require('../img/icons8-voltar-24.png')}  style={styles.sair}/>
                   
                    
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTexto}>
                  <Text style={styles.textoAnalise}>Sobre o App</Text>
               </View>
            </View>
            <View style={styles.containerImage}>
                <Image style={styles.logo} source={require('../img/logo.png')}/>
                

                <View style={styles.containerText}>
                <Text style={styles.texto}>
            O Sensory é um software desenvolvido com a finalidade
            de agilizar o processo de análise sensorial e torná-lo mais prático, tendo  em vista
            que grande parte das análises acontecem ainda com o uso de fichas de papel. </Text>
            
            <Text style={styles.texto1} >
            Todos os ícones usados nesse aplicativo foram retirados de : </Text>
            
            <Text style={styles.link} onPress={() => Linking.openURL('https://icons8.com.br/')}> https://icons8.com.br/ </Text>
            
                </View> 
            </View>
             
            <ScrollView>
               
        </ScrollView>
        
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
      fontSize: 16,
      marginBottom: 6,
      marginLeft: 18,
      marginRight: 18,
      textAlign: "justify",
    },

    texto1:{
      color: 'black',
      fontSize: 14,
      marginTop: 35,
      marginLeft: 18,
      marginRight: 18,
      padding: 4,
      textAlign: "justify",
      backgroundColor: "#D8BFD8",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    link:{
      color: 'blue',
      fontSize: 14,
      fontStyle: 'italic',
      marginLeft: 18,
      marginRight: 18,
      textAlign: "justify",
      padding:4,
      backgroundColor: "#D8BFD8",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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
    sair:{
      marginTop : 8,
      height: 25,
      width: 25,
    },
    containerImage: {
      marginTop: 10,
      marginBottom: 10,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      
    },

  logo: {
    marginTop: 70,
    height: 160,
    width: 160,
    marginBottom: 50,
  },
   
  containerText:{
    marginTop: 9,
    marginLeft: 3,
  }
});


