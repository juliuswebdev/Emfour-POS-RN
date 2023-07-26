
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import apiUrl from '../constants/apiUrl';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import {FontAwesome, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};



class ProductBox extends Component {

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
        let { id, name, product_description, image } = this.props.data;

        return (
    
            <View style={styles.productWrapper}>
                <View>
                    <Pressable onPress={() => this.props.navigation.navigate('ProductDetails', {
                        product_id: id,
                        product_name: name
                    })}>
                        <Image
                            style={styles.imageStyle}
                            source={{uri : apiUrl.PRODUCT_IMG+image}}
                            resizeMode={"cover"}
                        />
                    </Pressable>
                </View>
                <View style={styles.contentWrapper}>
                    <View>
                        <Pressable onPress={() => this.props.navigation.navigate('ProductDetails')}>
                            <Text style={styles.headingText}>{name}</Text>
                        </Pressable>
                    </View>
                    { 
                        (product_description) ?
                            <View>
                                <Text style={styles.descText}></Text>
                            </View>
                        : ''
                    }
                    {
                        (this.props.controls) ?
                            <View style={styles.amountWrapper}>
                                <View>
                                    <Text style={styles.amountText}>$20,154</Text>
                                </View>
                                <View style={styles.cartWrapper}>
                                    <View>
                                        <Pressable style={styles.iconRound} onPress={() => this.props.navigation.navigate('Products')}>
                                        <Feather style={{ alignSelf: "center" }} name="plus-circle" size={26} color={'#E49B0F'}  />
                                        </Pressable>
                                    </View>
                                    <View style={{ paddingHorizontal:10 }}>
                                        <Text style={{ fontSize:20, fontWeight:'900' }}>0</Text>
                                    </View>
                                    <View>
                                        <Pressable style={styles.iconRound} onPress={() => this.props.navigation.navigate('Checkout')}>
                                            <Feather style={{ alignSelf: "center" }} name="minus-circle" size={26} color={'red'}  />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        : '' 
                    }
                </View>
            </View> 
        
        );
    }
}
export default ProductBox

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
        borderRadius: 50,
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
        marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'
    },
    amountText:{
        fontSize:15, 
        fontWeight:900, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular'
    },
    cartWrapper:{
        flexDirection:'row', justifyContent:'space-between', alignItems:'center'
    },
    iconRound:{
        backgroundColor:'#fff',
        width: 26,
        height: 26,
        borderRadius: 13,
    }
});
