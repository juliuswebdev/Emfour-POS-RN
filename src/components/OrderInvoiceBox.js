
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import {FontAwesome5, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};

class OrderInvoiceBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
            invoice:this.props.invoice,
            table:this.props.table,
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

        const windowWidth = Dimensions.get('window').width;
        const perBoxWidth = windowWidth / 3.6;

        return (
    
            <View style={[styles.itemWrapper, {width:perBoxWidth}]}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('OrderDetails')} >
                    <View style={styles.orderWrapper}>
                        <View>
                            <Text style={styles.orderTitle}>#{this.state.invoice}</Text>
                        </View>
                        <View>
                            <Text style={styles.orderTitle}>{this.state.table}</Text>
                        </View>
                        <View>
                            <View style={styles.circleShape}>
                                <FontAwesome5 style={{ alignSelf: "center" }} name="file-invoice" size={15} color={styleConstant.FONT_WHITE}  />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        
        );
    }
}

export default OrderInvoiceBox

const styles = StyleSheet.create({
    itemWrapper:{
        height: 100,
        backgroundColor: styleConstant.PRIMARY_LIGHT_COLOR,
        margin:5,
        borderWidth:3,
        borderColor:styleConstant.CATE_TILES_BG,
        borderRadius:10,
    },
    orderWrapper:{
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        padding:10
    },
    orderTitle:{
        fontSize:16, 
        fontWeight:'900', 
        fontFamily: 'Mulish-Regular',
        paddingBottom:2
    },

    circleShape:{
        height: 30, //any of height
        width: 30, //any of width
        justifyContent:"center",
        backgroundColor:styleConstant.CATE_TILES_BG,
        borderRadius:15
    },
});
