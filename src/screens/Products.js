
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

import apiUrl from '../constants/apiUrl';
import HomeCategoryBox from '../components/HomeCategoryBox';
import ProductCategoryBox from '../components/ProductCategoryBox';
import BottomBar from '../components/BottomBar';
import ProductBox from '../components/ProductBox';

let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};


class Products extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          fontsLoaded: false,
          isSnakbarVisible: false,
          snakbarMessage:'',
          snakbarErrorType:'error',
          categories: [],
          products: []
      };
  }

  async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({fontsLoaded:true});
  }
  
  
  handelLogin = () => {
      navigation.navigate('Home'); 
  }

 
  async componentDidMount() {

      this._loadFontsAsync();

      const userData = await AsyncStorage.getItem('userData');
      const data = JSON.parse(userData);
      this.setState({categories:data.categories});


      let { category_id } = this.props.route.params;
      let productsAPI = apiUrl.API_URL+'api/v1/products?category_id='+category_id+'&location_id=13';
      let response = await fetch(productsAPI, {
          method: 'GET',
          headers: {
            Accept: 
            'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+data.token
          },
      });
      let products = await response.json();
      this.setState({products:products.products});
  }


  render() {
      let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage, categories, products } = this.state;
      let { category_name } = this.props.route.params;
      if (!this.state.fontsLoaded) {
          return null;
      }

      return (
        <SafeAreaView style={styleConstant.safeArea}>  
            <StatusBar style="dark" translucent={true} backgroundColor={styleConstant.PRIMARY_COLOR} /> 
            
            <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
                <ScrollView showsVerticalScrollIndicator={false}>  
                  <View style={styles.pageHeading}>
                    <Text style={styles.pageHeadingTitle}>{category_name}</Text>
                  </View>

                  <View>
                    {                    
                        products.map((product, key) => {
                            return (
                              <ProductBox navigation={this.props.navigation} key={key} data={product} controls={false}></ProductBox>
                            )
                        })
                    }
                  </View>

                  <View>
                      <View>
                        <Text style={styles.categoryTitle}>Categories</Text>
                      </View>
                      <ScrollView horizontal={true} style={{ flexDirection:'row', paddingBottom:15 }}>  
                            {                    
                                categories.map((prop, key) => {
                                    return (
                                    <HomeCategoryBox navigation={this.props.navigation} data={prop} key={key} style={{  marginRight:15 }}></HomeCategoryBox>
                                    )
                                })
                            }
                      </ScrollView>
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

  export default Products

const styles = StyleSheet.create({
    pageHeading:{
      marginTop:30, 
      flexDirection:'row', 
      paddingVertical:15,
      alignItems:'center'
    },
    pageHeadingTitle:{
      fontSize:styleConstant.FONT_SIZE_2XLARGE, 
      fontWeight:900, 
      color:styleConstant.TEXT_BLACK, 
      fontFamily:'Mulish-Regular',
      textTransform: 'uppercase',
      letterSpacing: 1
    },
    categoryTitle:{
      fontSize:styleConstant.FONT_SIZE_2XLARGE, 
      fontWeight:900, 
      color:styleConstant.SECONDARY_COLOR, 
      fontFamily:'Mulish-Regular',
    }
   

   
});
