
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

export default class Analise extends React.Component{

render() {
    return (
        <View style={styles.container}>
        <View style={styles.containerExibir}>
        <ScrollView horizontal={true}>
        <View style={styles.containerText}>
                  <View style={styles.view} >
                  <Image source={require('../img/icons8-tarefa-64.png')}  style={styles.icone}/>
                    <Text style={styles.descricao}> {this.props.descricao}</Text>
                  </View>
                  <Text style={styles.text}>Local: {this.props.local}</Text>
                  <Text style={styles.text}>Sala: {this.props.sala}</Text>
                  <Text style={styles.text}>Data: {this.props.data}</Text>
                  <Text style={styles.text}>Quantidade de amostras: {this.props.qtdAmostras}</Text>
        </View>
        </ScrollView>
        </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerExibir: {
      marginTop: 5,
      marginBottom: 15,
      height: 170,
      width: 323,
      borderRadius: 5,
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
     }, 
     text: {
       color: 'black',
       fontSize: 14,
       marginLeft: 8,
       marginRight: 8,
     },
     containerText: {
       marginTop: 0,
     },
     view:{
        marginBottom: 0,
        padding: 0,
        backgroundColor: '#2E8B57',
        height: 50,
        width: 323,
      flexDirection: 'row',
     },
     imagem :{
       width: 50,
       height: 50,
     },
     descricao:{
      color: 'white',
      fontSize: 17,
      marginLeft: 4,
      marginRight: 8,
      marginTop: 6,
     },
     icone:{
        width: 35,
        height: 35,
        marginTop: 3,
        marginLeft: 2,
     }
  });