
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class ProductCategoryBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false
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
        if (!this.state.fontsLoaded) {
            return null;
        }

  
        return (
        <Pressable onPress={() => this.props.navigation.navigate('Products')}>
            <View style={styles.categoryWrapper}>
                <View>
                    <Image
                        style={styles.imageStyle}
                        source={images.main_screen_food}
                        resizeMode={"cover"}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.categoryTitle}>
                        Desserts
                    </Text>
                </View>
            </View> 
        </Pressable>
        );
    }
}
export default ProductCategoryBox

const styles = StyleSheet.create({
    categoryWrapper:{
        padding:20,
        borderRadius: 25,
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',

    },
    imageStyle:{
        width:100,
        height:100
    },
    categoryTitle:{
        fontSize:styleConstant.FONT_SIZE_MEDIUM, 
        fontWeight:600, 
        color:styleConstant.FONT_WHITE 
    },
    textWrapper:{
        position:'absolute',
        bottom:15
    }
});
