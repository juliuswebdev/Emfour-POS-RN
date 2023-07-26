
import React, { useEffect, useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Image, Text } from "react-native";

import styleConstant from '../styles/index';

import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

export default function Splash({ navigation }) {

  /*
  async function customSetting(){
      setTimeout(() => {
        navigation.navigate('Login'); 
      }, 1500);
  }
  */

  async function checkAuth(){
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken != null){
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
    }else{
      setTimeout(() => {
        navigation.navigate('Login'); 
      }, 1500);
    }
  }

  useEffect(() => {
    checkAuth();
    //customSetting();
  }, [])
  
  
  return (
    <SafeAreaView style={styleConstant.safeArea}>  
        <StatusBar translucent={true} backgroundColor={styleConstant.PRIMARY_COLOR} /> 
        <View style={{ flex: 2, justifyContent:'center'}} >
          <Animatable.View animation="zoomInUp" duration={1500} style={{ flexDirection:'row', justifyContent:'center'  }}>
                
                <Image
                    style={styles.logo}
                    source={images.logo}
                    resizeMode={"cover"}
                />

          </Animatable.View>
        </View>
       
        <View style={{ flex: 1, justifyContent:'center', alignSelf:'center'}} >
            <ActivityIndicator animating={true} size={styleConstant.FONT_SIZE_3XLARGE} color={styleConstant.SECONDARY_COLOR}  />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    logo:{
        width:200,
        height:150
    }
});
