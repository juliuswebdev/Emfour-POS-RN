
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome, Feather, Ionicons  } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';

import ProductCard from '../components/ProductCard';
import apiUrl from '../constants/apiUrl';

let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};


class ProductDetails extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          fontsLoaded: false,
          isSnakbarVisible: false,
          snakbarMessage:'',
          snakbarErrorType:'error',
          product: [],
          variations: [],
      };
  }

  async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({fontsLoaded:true});

      const userData = await AsyncStorage.getItem('userData');
      const data = JSON.parse(userData);
      
      let { product_id } = this.props.route.params;
      let productAPI = apiUrl.API_URL+'api/v1/product/'+product_id+'?location_id=7';
      let response = await fetch(productAPI, {
          method: 'GET',
          headers: {
            Accept: 
            'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+data.token
          },
      });
      let product = await response.json();
      this.setState({product:product.product});
      console.log('product.variations', product.product.variations);
      this.setState({variations:product.product.variations});
  }
  
  
  handelLogin = () => {
      navigation.navigate('Home'); 
  }

 

  
  componentDidMount() {
      this._loadFontsAsync();
  }


  render() {
      let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage, product, variations } = this.state;
  
      if (!this.state.fontsLoaded) {
          return null;
      }
   
      return (
    <SafeAreaView style={styleConstant.safeArea}>  
         <StatusBar style="dark" translucent={true} backgroundColor={styleConstant.PRIMARY_COLOR} /> 
        
        <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
            <ScrollView showsVerticalScrollIndicator={false}>  
              <View style={styles.pageHeading}>
                <Text style={styles.pageHeadingTitle}>{product.name}</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'center', paddingVertical:10}}>
                  <Image
                      style={styles.imageStyle}
                      source={{uri : apiUrl.PRODUCT_IMG+product.image}}
                      resizeMode={"cover"}
                  />
              </View>

         

              <View style={{ marginTop:30, paddingHorizontal:20}}>
                  <View>
                    <Text style={styles.categoryTitle}>Includes</Text>
                  </View>
                  <View style={{ flexDirection:'column', paddingVertical:15 }}> 
                    {
                      (variations) ?
                        variations.map((variation, key) => {
                          return (
                            <ProductCard navigation={this.props.navigation} key={key} variation={variation} product={product}></ProductCard>
                          )
                        })
                      :''
                    }
                    
              
                  </View>
              </View>

              <View style={{paddingBottom:20, paddingHorizontal:20}}>
                  
                  <Pressable disabled={(isLoading == true) ? true : false} onPress={() => this.props.navigation.navigate('Checkout')}  style={[styles.appButtonContainer, styleConstant.btnBg]}>
                      { isLoading == false ?
                          <Text style={[styles.appButtonText, styleConstant.btnText]}>Checkout</Text> 
                      :
                      <ActivityIndicator animating={true} size={themeStyle.constants.FONT_SIZE_XLARGE} color={styleConstant.BTN_LOADER_COLOR}  />
                      }
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

export default ProductDetails

const styles = StyleSheet.create({
    pageHeading:{
      marginTop:30, 
      flexDirection:'row', 
      paddingVertical:15,
      alignItems:'center',
      justifyContent:'center'
    },
    pageHeadingTitle:{
      fontSize:styleConstant.FONT_SIZE_2XLARGE, 
      fontWeight:900, 
      color:styleConstant.TEXT_BLACK, 
      fontFamily:'Mulish-Regular'
    },
    imageStyle:{
        width: 300,
        height: 200,
    },
    cartWrapper:{
      flexDirection:'row', justifyContent:'center', alignItems:'center'
    },
    iconRound:{
        backgroundColor:'#000',
        width: 26,
        height: 26,
        borderRadius: 12,
    },
    categoryTitle:{
      fontSize:styleConstant.FONT_SIZE_LARGE, 
      fontWeight:900, 
      color:styleConstant.SECONDARY_COLOR, 
      fontFamily:'Mulish-Regular',
    },
    appButtonContainer: {
      elevation: 1,
      borderRadius: 50,
      paddingVertical: 15,
      paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: 'Mulish-Regular'
    },
   
});
