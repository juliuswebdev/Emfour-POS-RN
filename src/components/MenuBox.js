
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



class MenuBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
            title:this.props.title,
            icon:this.props.icon,
            action:this.props.action
        };
    }
  
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded:true});
    }

    actionEvent = (action) => {
        if(action == "Logout"){
           this.handelLogout();
        }else{
            this.props.navigation.navigate(action);
        }
    }
  
    handelLogout = () => {
        try {
            AsyncStorage.removeItem('userData');
            this.props.navigation.navigate('Login')
            return true;
        }
        catch(e) {
            alert(e);
        }
    }
    
    componentDidMount() {
        this._loadFontsAsync();
    }
  
  
    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        return (
    
            <View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.actionEvent(this.state.action)} >
                    <View style={[styles.menuWrapper, {borderLeftColor:styleConstant.CATE_TILES_BG}]}>
                        <View style={{ paddingLeft:0, width:30 }}>
                        
                            <Feather style={{ alignSelf: "center" }} name={this.state.icon} size={25} color={styleConstant.CATE_TILES_BG}  />

                        </View>
                        <View style={{paddingLeft:10}}>
                            <Text style={[styles.menuTitle, {color:styleConstant.FONT_SECONDARY_COLOR}]}>{this.state.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        
        );
    }
}

export default MenuBox

const styles = StyleSheet.create({
    menuWrapper:{
        padding:15, 
        borderRadius:10, 
        flexDirection:'row', 
        alignItems:'center',
        borderLeftWidth:5,
        marginBottom:15,
        borderLeftColor:styleConstant.CATE_TILES_BG,
        backgroundColor:styleConstant.PRIMARY_LIGHT_COLOR
    },
    menuTitle:{
        fontSize:18, 
        fontWeight:'700', 
        fontFamily: 'Mulish-Regular'
    },

});
