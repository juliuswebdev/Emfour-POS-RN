
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, Button, View, Text, StyleSheet} from "react-native";
import styleConstant from '../styles/index';
import {FontAwesome, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};

class BottomBar extends Component {

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
            <View style={styles.bottomWrapper}>
                <Pressable onPress={() => this.props.navigation.navigate('Home')}>
                    <View style={styles.squareShape}>
                        <Feather style={{ alignSelf: "center" }} name="home" size={25} color={styleConstant.FONT_WHITE}  />
                    </View>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('Orders')}>
                    <View style={styles.squareShape}>
                        <Feather style={{ alignSelf: "center" }} name="check" size={25} color={styleConstant.FONT_WHITE}  />
                    </View>
                </Pressable>
                <Pressable  onPress={() => this.props.navigation.navigate('Checkout')}>
                    <View style={styles.squareShape}>
                        <Feather style={{ alignSelf: "center" }} name="shopping-cart" size={25} color={styleConstant.FONT_WHITE}  />
                    </View>
                </Pressable>
            </View> 
        );
    }
}
export default BottomBar

const styles = StyleSheet.create({
    bottomWrapper:{
        padding:12,
        backgroundColor:styleConstant.SECONDARY_COLOR,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    squareShape:{
        height: 40, //any of height
        width: 40, //any of width
        justifyContent:"center",
        backgroundColor:styleConstant.CATE_TILES_BG,
        borderRadius: 5,
    },
});
