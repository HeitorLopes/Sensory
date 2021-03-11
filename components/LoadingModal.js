
import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Modal, Text} from 'react-native';
export default class LoadingModal extends React.Component{
   
render(){
    return(
      <Modal visible={this.props.visible} animationType='fade' transparent={false} onRequestClose={() => {}}>
                <View style={styles.container}>
                  <ActivityIndicator></ActivityIndicator>
                  
          </View>
        </Modal>
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
  },
})