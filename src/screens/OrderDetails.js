
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
import BottomBar from '../components/BottomBar';
import OrderItemBox from '../components/OrderItemBox';

let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class OrderDetails extends Component {

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
          
          <TopBar navigation={this.props.navigation} leftIcon="menu" leftAction="SideDrower" screenTitle="Order Details"></TopBar>
          


          <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
              <ScrollView showsVerticalScrollIndicator={false}>  
                
                <View>
                  <View style={[styleConstant.flexRowStart, {paddingBottom:10}]}>
                    <Text style={styles.labelText}>Invoice #: </Text>
                    <Text style={styles.labelValue}>001</Text>
                  </View>
                  <View style={[styleConstant.flexRowStart, {paddingBottom:10}]}>
                    <Text style={styles.labelText}>Table #: </Text>
                    <Text style={styles.labelValue}>T1</Text>
                  </View>
                  <View style={[styleConstant.flexRowStart, {paddingBottom:10}]}>
                    <Text style={styles.labelText}>Status: </Text>
                    <Text style={styles.labelValue}>Inprogress</Text>
                  </View>
                </View>

                <View style={{ width:"90%", paddingHorizontal:10 }}>
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
export default OrderDetails

const styles = StyleSheet.create({
  orderTotal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    paddingVertical:30
  },
  orderTotalText:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    textTransform: 'uppercase',
  },
  labelText:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    color:styleConstant.FONT_BLACK
  },
  labelValue:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    color:styleConstant.SECONDARY_COLOR
  }

   
});
