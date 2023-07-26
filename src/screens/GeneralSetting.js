
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome5, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';
import { Dropdown } from 'react-native-element-dropdown';

import TopBar from '../components/TopBar';
let customFonts = {
  'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class GeneralSettings extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          fontsLoaded: false,
          isSnakbarVisible: false,
          snakbarMessage:'',
          snakbarErrorType:'error',
          isFocusLocation: false,
          locationData:'',
          location:'',
          selected_location:'',
          selected_location_id:''
      };
  }

  async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({fontsLoaded:true});
  }
  
  
  handelLogin = () => {
    this.props.navigation.navigate('Home'); 
  }

  settingData = () => {
    var location = [{
      id : "1",
      name : "Hello"
    }, {
      id : "2",
      name : "Hello"
    }];

    this.setState({locationData:location});

  }

  
  componentDidMount() {
      this._loadFontsAsync();
      this.settingData();
  }


  render() {
      let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage, locationData } = this.state;
      if (!this.state.fontsLoaded && locationData == "") {
          return null;
      }
      return (
      <SafeAreaView style={styleConstant.safeArea}>  
          <StatusBar style="light" translucent={true} backgroundColor={styleConstant.SECONDARY_COLOR} /> 
          
          <TopBar navigation={this.props.navigation} leftIcon="menu" leftAction="SideDrower" screenTitle="General Settings"></TopBar>
          


          <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
              <ScrollView showsVerticalScrollIndicator={false}>  
                
                <View>
                  <View style={styles.inputWrapper}>
                      <View style={{ flexDirection:'row', alignItems:'center', width:'38%' }}>
                          <View style={styles.circleShape}>
                              <Feather style={{ alignSelf: "center" }} name="map-pin" size={15} color={styleConstant.FONT_WHITE}  />
                          </View>
                          <View>
                            <Text style={styles.inputLabel}>Location</Text>
                          </View>
                      </View>
                      <View>

                        <Dropdown
                            style={[styles.dropdown, {borderColor:styleConstant.INPUT_BACKGROUND,
                                backgroundColor:styleConstant.INPUT_BACKGROUND,
                                color:styleConstant.FONT_PRIMARY_COLOR}, this.state.isFocusLocation && { borderColor: '#000' }]}
                            placeholderStyle={[styles.placeholderStyle, {color:styleConstant.FONT_SECONDARY_COLOR}]}
                            selectedTextStyle={[styles.selectedTextStyle, {color:styleConstant.FONT_SECONDARY_COLOR}]}
                            inputSearchStyle={styles.inputSearchStyle}
                            containerStyle={{zIndex:60,top:0}}
                            data={this.state.locationData}
                            search
                            maxHeight={300}
                            labelField="name"
                            valueField="id"
                            placeholder="Select Location"
                            searchPlaceholder="Search..."
                            value={this.state.location}
                            onFocus={() => this.setState({ isFocusLocation: true }) }
                            onBlur={() =>  this.setState({ isFocusLocation: false })}
                            onChange={item => {
                                //this.setState({ selected_location_id:item.id, selected_location:item.name })
                                //this.setState({ isFocusLocation: false });
                            }}
                        />

                      </View>
                  </View>

                  <View style={styles.inputWrapper}>
                      <View style={{ flexDirection:'row', alignItems:'center',  width:'38%' }}>
                          <View style={styles.circleShape}>
                              <FontAwesome5 style={{ alignSelf: "center" }} name="chair" size={15} color={styleConstant.FONT_WHITE}  />
                          </View>
                          <View>
                            <Text style={styles.inputLabel}>Set Table #</Text>
                          </View>
                      </View>
                      <View>

                        <Dropdown
                            style={[styles.dropdown, {borderColor:styleConstant.INPUT_BACKGROUND,
                                backgroundColor:styleConstant.INPUT_BACKGROUND,
                                color:styleConstant.FONT_PRIMARY_COLOR}, this.state.isFocusLocation && { borderColor: '#000' }]}
                                placeholderStyle={[styles.placeholderStyle, {color:styleConstant.FONT_SECONDARY_COLOR}]}
                                selectedTextStyle={[styles.selectedTextStyle, {color:styleConstant.FONT_SECONDARY_COLOR}]}
                                inputSearchStyle={styles.inputSearchStyle}
                                containerStyle={{zIndex:60,top:0}}
                                data={this.state.locationData}
                                search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder="Select Location"
                                searchPlaceholder="Search..."
                                value={this.state.location}
                                onFocus={() => this.setState({ isFocusLocation: true }) }
                                onBlur={() =>  this.setState({ isFocusLocation: false })}
                                onChange={item => {
                                //this.setState({ selected_location_id:item.id, selected_location:item.name })
                                //this.setState({ isFocusLocation: false });
                            }}
                        />

                      </View>
                  </View>
                  
                </View>

                
                <View style={{ flexDirection:'column', alignItems:'center', paddingTop:50 }}>
                  <Pressable onPress={() => this.props.navigation.navigate('Orders')}>

                    <View style={styles.appButtonContainer}>
                      <View style={{ flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10 }}>
                        <View>
                          <Text style={styles.btnTitle}>Save</Text>
                        </View>
                        <View>
                          <FontAwesome5 style={{paddingLeft:10}} name="caret-right" size={30} color="#FFF" />
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
export default GeneralSettings

const styles = StyleSheet.create({
  inputWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:10
  },
  circleShape:{
    height: 30, //any of height
    width: 30, //any of width
    justifyContent:"center",
    backgroundColor:styleConstant.CATE_TILES_BG,
    borderRadius:15
  },
  inputLabel:{
    fontSize:styleConstant.FONT_SIZE_MEDIUM, 
    fontWeight:"500", 
    fontFamily:'Mulish-Regular',
    paddingLeft:5
  },
  dropdown: {
      width:200,
      borderRadius:5,
      padding:10,
      fontSize:14,
      fontWeight:'500',
      paddingLeft:10,
      fontFamily: 'Mulish-Regular',
      height:40,
  },
  placeholderStyle: {
      fontSize:14,
      fontWeight:'700',
      fontFamily: 'Mulish-Regular'
  },
  selectedTextStyle: {
      fontSize:14,
      fontWeight:'700',
      fontFamily: 'Mulish-Regular'
  },
  inputSearchStyle: {
      height: 40,
      fontSize: 14,
      fontFamily: 'Mulish-Regular'
  },
  btnTitle:{
    fontSize:styleConstant.FONT_SIZE_LARGE, 
    fontWeight:900, 
    fontFamily:'Mulish-Regular',
    color:styleConstant.FONT_WHITE
  },
  appButtonContainer: {
      elevation: 1,
      borderRadius: 50,
      paddingVertical: 10,
      paddingHorizontal: 55, 
      backgroundColor: styleConstant.CATE_TILES_BG
  },


   
});
