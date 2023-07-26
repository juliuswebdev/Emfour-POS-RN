
import React, { useEffect, useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesome, Feather } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import * as Font from 'expo-font';

import TopBar from '../components/TopBar';
import HomeCategoryBox from '../components/HomeCategoryBox';
import BottomBar from '../components/BottomBar';

let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
            isSnakbarVisible: false,
            snakbarMessage:'',
            snakbarErrorType:'error',
            categories: []
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded:true});
    }
    
    
    handelLogin = () => {
        navigation.navigate('Home'); 
    }

    async componentDidMount() {
        this._loadFontsAsync();
        const userData = await AsyncStorage.getItem('userData');
        const data = JSON.parse(userData);
        this.setState({categories:data.categories});
    }

  
    render() {
        let { isLoading, isSnakbarVisible, snakbarErrorType, snakbarMessage, categories } = this.state;
        if (!this.state.fontsLoaded) {
            return null;
        }
  
        return (
            <SafeAreaView style={styleConstant.safeArea}>  
                <StatusBar style="light" translucent={true} backgroundColor={styleConstant.SECONDARY_COLOR} /> 
                
                <TopBar navigation={this.props.navigation} leftIcon="menu" leftAction="SideDrower" screenTitle="Categories"></TopBar>
                
                <Animatable.View style={[styleConstant.layoutContainer, {paddingBottom:0}]} >
                    <ScrollView showsVerticalScrollIndicator={false}>  
                        <View>
                            {                    
                                categories.map((cat_data, cat_key) => {
                                    return (
                                        <View>
                                        <HomeCategoryBox navigation={this.props.navigation} data={cat_data} key={cat_key}></HomeCategoryBox>
                                        {
                                            (cat_data.sub_categories.length > 0) ?
                                                <View  style={styles.subCategoryArea}>
                                                {
                                                    cat_data.sub_categories.map((sub_cat_data, sub_cat_key) => {
                                                        return (
                                                            <HomeCategoryBox navigation={this.props.navigation} data={sub_cat_data} key={sub_cat_key}></HomeCategoryBox>
                                                        )
                                                    })
                                                }
                                                </View>
                                            : ''
                                        }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView> 
                </Animatable.View>

                <View>
                <BottomBar navigation={this.props.navigation}></BottomBar>
                </View>
                
                {/* <Snackbar
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
                </Snackbar> */}


            </SafeAreaView>
        );
   }
}

export default Home

const styles = StyleSheet.create({
    

   

   
});
