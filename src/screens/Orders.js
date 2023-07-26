
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';

import TopBar from '../components/TopBar';
import OrderInvoiceBox from '../components/OrderInvoiceBox';
import BottomBar from '../components/BottomBar';

let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class Orders extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          fontsLoaded: false,
          isSnakbarVisible: false,
          snakbarMessage:'',
          snakbarErrorType:'error',
      };
  }

  async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({fontsLoaded:true});
  }
  

 

  
  componentDidMount() {
      this._loadFontsAsync();
  }


  render() {
      let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage } = this.state;
      if (!this.state.fontsLoaded) {
          return null;
      }
      return (
      <SafeAreaView style={styleConstant.safeArea}>  
          <StatusBar style="light" translucent={true} backgroundColor={styleConstant.SECONDARY_COLOR} /> 
          
          <TopBar navigation={this.props.navigation} leftIcon="menu" leftAction="SideDrower" screenTitle="Orders"></TopBar>
          


          <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
              <ScrollView showsVerticalScrollIndicator={false}>  
                
              <View style={{ flex: 1, flexDirection:'row', justifyContent: 'flex-start', flexWrap : 'wrap'}}>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
                <OrderInvoiceBox navigation={this.props.navigation} invoice="001" table="T1"></OrderInvoiceBox>
              </View>


              </ScrollView> 
          </Animatable.View>

          <View>
            <BottomBar navigation={this.props.navigation}></BottomBar>
          </View>
        
          
          <Snackbar
              style={{ backgroundColor: (snakbarErrorType == 'error') ? styleConstant.FONT_DEBIT_COLOR : styleConstant.FONT_CREDIT_COLOR, fontFamily: 'Mulish-Regular' }}
              visible={isSnakbarVisible}
              duration={7000}
              onDismiss={() => this.setState({ isSnakbarVisible: false })}
              action={{
                  label: 'Close',
                  onPress: () => this.setState({ isSnakbarVisible: false })
                  }}
              >
              {snakbarMessage}
          </Snackbar>


      </SafeAreaView>
      );
  }
}
export default Orders

const styles = StyleSheet.create({
   
});
