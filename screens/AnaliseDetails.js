

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {CheckBox, Icon} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
export default class AnaliseDetails extends Component {

  state ={
    alergias:'',
    checkBox: false,
    alergias: '',
  }
  
  onePressed(){
    this.setState({checkBox:!this.state.checkBox});
  }
  
  verificar () {
      this.state.alergias = this.props.navigation.state.params.alergias;
      if(this.state.alergias==''){
        this.props.navigation.navigate('Avaliar')
      } else{
        return <Text>{this.state.alergias}</Text>
      }
      
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Image source={require('../img/icons8-cozinheiro-32.png')} style={styles.imagem} />
        <Text style={styles.text}>ATENÇÃO</Text>
      </View>
      <Text style={styles.textAlergia}>Esta análise possui ingredientes que não são recomendáveis aos alérgicos a:</Text>
       <View style={styles.containerAlergia}>
            <ScrollView>
            <Text style={styles.textAlergia}>{this.verificar()}</Text>
            </ScrollView>
      </View>
      <View>

         <TouchableOpacity style={styles.buttonContinuar} disabled={!this.state.checkBox} onPress={() =>  this.props.navigation.navigate('Avaliar')}>
          <Text style={styles.buttonOptions2}>Continuar</Text>
          </TouchableOpacity>
           
          <TouchableOpacity style={styles.buttonVoltar} onPress={() =>  this.props.navigation.navigate('Home')}>
            <Text style={styles.buttonOptions}>Voltar</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.check}>
      <CheckBox checked={this.state.checkBox} style={styles.checkBox} onPress={() => this.onePressed()}/>
      <Text style={styles.checkElemento}>Não sou alérgico</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  containerTitulo:{
    flexDirection: 'row',
    marginBottom: 60,
    justifyContent: 'center',

  },
  text:{
    color: 'black',
    fontSize: 25,
    marginTop: 5,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  containerAlergia: {
    justifyContent: 'center',
    marginBottom: 200,
  },
 textAlergia:{
  marginTop: 5,
  padding: 10,
  fontSize: 15,
 },
 buttonContinuar:{
    backgroundColor: '#3CB371',
    padding: 16,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 30,
    justifyContent: 'center',
 },
 buttonVoltar:{
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    height: 30,
    justifyContent: 'center',
   
 },
 buttonOptions:{
   fontSize: 15,
   color: 'black',
 },
 buttonOptions2:{
  fontSize: 15,
  color: 'white',
},
 check:{
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 8,
 },
 checkElemento: {
   marginTop: 5,
   marginLeft: 15,
 }, 
 checkBox: {
  marginTop: 6,
 },

 imagem:{
  width: 40,
  height: 40,
  marginTop: 5,
}
});


































 