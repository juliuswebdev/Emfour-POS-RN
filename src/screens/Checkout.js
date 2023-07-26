
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

import TopBar from '../components/TopBar';
import OrderItemBox from '../components/OrderItemBox';
let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class Checkout extends Component {

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
  
  
  handelLogin = () => {
      navigation.navigate('Home'); 
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
          
          <TopBar navigation={this.props.navigation} leftIcon="menu" leftAction="SideDrower" screenTitle="Checkout"></TopBar>
          


          <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
              <ScrollView showsVerticalScrollIndicator={false}>  
                
                <View>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  <OrderItemBox navigation={this.props.navigation}></OrderItemBox>
                  
                </View>

                <View style={styles.orderTotal}>
                    <Text style={styles.orderTotalText}>Total</Text>
                    <Text style={styles.orderTotalText}>$451</Text>
                </View>

              <View style={{ flexDirection:'column', alignItems:'center', paddingBottom:50 }}>
                  <Pressable onPress={() => this.props.navigation.navigate('Orders')}>

                    <View style={styles.appButtonContainer}>
                      <View style={{ flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10 }}>
                        <View>
                          <Text style={styles.btnTitle}>Submit Order</Text>
                        </View>
                        <View>
                          <FontAwesome style={{paddingLeft:10}} name="caret-right" size={30} color="#FFF" />
                        </View>
                      </View>
                    </View>

                  </Pressable>

              </View>


              </ScrollView> 
          </Animatable.View>

        
          
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
export default Checkout

const styles = StyleSheet.create({
  orderTotal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    paddingVertical:20
  },
  orderTotalText:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    textTransform: 'uppercase',
  },
  btnTitle:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    textTransform: 'uppercase',
    color:styleConstant.FONT_WHITE
  },
  appButtonContainer: {
      elevation: 1,
      borderRadius: 50,
      paddingVertical: 12,
      paddingHorizontal: 12, 
      width:"60%",
      backgroundColor:'red'
  },


   
});
