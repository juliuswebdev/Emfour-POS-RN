
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import * as Font from 'expo-font';


import TopBar from '../components/TopBar';
import MenuBox from '../components/MenuBox';

let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};
  
class SideDrower extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
            isSnakbarVisible: false,
            snakbarMessage:'',
            snakbarErrorType:'error',
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
        let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage } = this.state;
        if (!this.state.fontsLoaded) {
            return null;
        }
        
        return (
            <SafeAreaView style={styleConstant.safeArea}>  
                <StatusBar style="light" translucent={true} backgroundColor={styleConstant.SECONDARY_COLOR} /> 
                
                <TopBar navigation={this.props.navigation} leftIcon="home" leftAction="Home" screenTitle="Home"></TopBar>
                
                <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0, backgroundColor:styleConstant.SECONDARY_COLOR}]} >
                    <ScrollView showsVerticalScrollIndicator={false}>  
                        <MenuBox navigation={this.props.navigation} title="Home" icon="home" action="Home"></MenuBox>
                        <MenuBox navigation={this.props.navigation} title="My Cart" icon="shopping-cart" action="Checkout"></MenuBox>
                        <MenuBox navigation={this.props.navigation} title="Orders" icon="check" action="Orders"></MenuBox>
                        <MenuBox navigation={this.props.navigation} title="General Setting" icon="settings" action="GeneralSetting"></MenuBox>
                        <MenuBox navigation={this.props.navigation} title="Logout" icon="power" action="Logout"></MenuBox>
                    </ScrollView> 
                </Animatable.View>
            </SafeAreaView>
        );
    }
}

export default SideDrower;

const styles = StyleSheet.create({
  
});
