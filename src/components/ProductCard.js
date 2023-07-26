
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



class ProductCard extends Component {

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

        let { name } = this.props.product;
        let { sell_price_inc_tax } = this.props.variation;

        if (!this.state.fontsLoaded) {
            return null;
        }
  
        return (
    
            <View style={styles.productWrapper}>
                <View style={{ flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center', width:"70%" }}>
                    <View>
                        <Image
                            style={styles.imageStyle}
                            source={images.main_screen_food}
                            resizeMode={"cover"}
                        />
                    </View>
                    
                    <View style={{ paddingLeft:10, flexShrink: 1 }}>
                        <Text style={styles.headingText}>{name} {(this.props.variation.name != 'DUMMY') ? this.props.variation.name : ''}</Text>
                        <Text style={styles.amountText}>$ {sell_price_inc_tax}</Text>
                    </View>

                </View>
                <View style={styles.contentWrapper}>
                    <View>
                        <Pressable  onPress={() => this.props.navigation.navigate('Products')}>
                        <Feather style={styles.iconRound} name="plus-circle" size={26} color={styleConstant.PRIMARY_COLOR}  />
                        </Pressable>
                    </View>
                    <View style={{ paddingHorizontal:7 }}>
                        <Text style={{ fontSize:20, fontWeight:'900' }}>0</Text>
                    </View>
                    <View>
                        <Pressable style={styles.iconRound} onPress={() => this.props.navigation.navigate('Products')}>
                        <Feather style={styles.iconRound} name="minus-circle" size={26} color={styleConstant.PRIMARY_COLOR}  />
                        </Pressable>
                    </View>
                </View>
            </View> 
        
        );
    }
}

export default ProductCard

const styles = StyleSheet.create({
    productWrapper:{
        padding:10,
        borderRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        marginBottom:15,
        backgroundColor:styleConstant.PRIMARY_LIGHT_COLOR
    },
    imageStyle:{
        width: 50,
        height: 50,
        borderWidth: 4,
        borderRadius: 10,
    },
    contentWrapper:{
        flexDirection:'row',
        alignItems:'center',
        width:"30%"
    },

    headingText:{
        fontSize:styleConstant.FONT_SIZE_SMALL, 
        fontWeight:700, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular',
    },
    amountText:{
        fontSize:15, 
        fontWeight:900, 
        color:styleConstant.TEXT_BLACK, 
        fontFamily:'Mulish-Regular'
    },
    iconRound:{
        backgroundColor:'#000',
        width: 26,
        height: 26,
        borderRadius: 12,
    },
    
});
