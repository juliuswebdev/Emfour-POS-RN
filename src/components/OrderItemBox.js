
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import {FontAwesome, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class OrderItemBox extends Component {

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
    
            <View style={styles.productWrapper}>
                <View>
                    <Pressable onPress={() => this.props.navigation.navigate('ProductDetails')}>
                        <Image
                            style={styles.imageStyle}
                            source={images.main_screen_food}
                            resizeMode={"cover"}
                        />
                    </Pressable>
                </View>
                <View style={styles.contentWrapper}>
                    <View>
                        <Pressable onPress={() => this.props.navigation.navigate('ProductDetails')}>
                            <Text style={styles.headingText}>Food item 1</Text>
                        </Pressable>
                    </View>
                    <View style={styles.amountWrapper}>
                        
                        <Text style={styles.amountText}>$20 * 1 </Text>
                        <Text style={styles.amountText}>$20</Text>
                    
                    
                    </View>
                </View>
            </View> 
        
        );
    }
}

export default OrderItemBox

const styles = StyleSheet.create({
    productWrapper:{
        padding:10,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        marginBottom:5,
    },
    imageStyle:{
        width: 100,
        height: 100,
        borderWidth: 4,
    },
    contentWrapper:{
        paddingLeft:20,
        width:"70%"
    },

    headingText:{
        fontSize:styleConstant.FONT_SIZE_LARGE, 
        fontWeight:900, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular',
        marginBottom:10
    },
    descText:{
        fontSize:13, 
        fontWeight:500, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular'
    },
    amountWrapper:{
        marginTop:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'
    },
    amountText:{
        fontSize:16, 
        fontWeight:900, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular'
    },

   
});
