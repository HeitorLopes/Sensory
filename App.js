
import React, {Component} from 'react';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreenTela from './screens/HomeScreenTela';
import AnaliseDetails from './screens/AnaliseDetails'; 
import Avaliar from './screens/Avaliar'; 
import Agradecimento from './screens/Agradecimento'; 
import TelaSobre from './screens/TelaSobre'; 

export default class App extends React.Component{

  render(){ 
    return(
      <Switch/>
      
    );
  }
}

const Stack = createStackNavigator(
  {
    Home: HomeScreenTela,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
    headerTransparent: true,
    }
  }, 
);

const Switch = createSwitchNavigator(
  {
    Login: LoginScreen,
    Cadastro: CadastroScreen,
    Avaliar: Avaliar,
    Informacoes: AnaliseDetails,
    Agradecimento: Agradecimento,
    TelaSobre: TelaSobre,
    Stack: Stack,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
    headerTransparent: true,
  }}
  );

