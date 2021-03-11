
import React, {Component} from 'react';

const teamsApiUrl = 'https://sensoryifrn.herokuapp.com/api/analisesensorial/findAll';
async function getAll() {
    try {
      const response = await fetch(teamsApiUrl);
      const responseJson = await response.json();
  
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
  
  const teamsApi = {
    getAll,
  };
  
    export default teamsApi;

class TeamsApi extends Component{

}