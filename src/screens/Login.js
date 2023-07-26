
import React, { useEffect, useState, Component  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Button, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Snackbar } from 'react-native-paper';

import apiUrl from '../constants/apiUrl';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
            isSnakbarVisible: false,
            snakbarMessage:'',
            snakbarErrorType:'error',
            isPasswordVisible: false,
            keyboardState: 'closed',
            username:'',
            password:''
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded:true});
    }

    handelUsername = (input) => {
        this.setState({username:input});
    }
    
    handelPassword = (input) => {
        this.setState({password:input});
    }
    
    handelLogin = async () => {
        var username = this.state.username;
        var password = this.state.password;
        if(username == ""){
            this.setState({ isSnakbarVisible: true, snakbarMessage: 'The username field is requiredss.'})
        }else if(password == ""){
            this.setState({ isSnakbarVisible: true, snakbarMessage: 'The password field is requiredss.'})
        }else{
            this.setState({isLoading:true});
            try {
                let loginAPI = apiUrl.API_URL+'api/v1/login';
                let response = await fetch(loginAPI, {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    username, password
                    })
                });
                let data = await response.json();
                if(data.status) {
                    this.setState({isLoading:false});
                    this.storeLocalData(JSON.stringify(data));
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({isLoading:false});
                    this.setState({ isSnakbarVisible: true, snakbarMessage: data.message }) 
                }
            } catch (err) {
                this.setState({isLoading:false});
                this.setState({ isSnakbarVisible: true, snakbarMessage: err.message })
            }
            
            
        }
    }



    
    storeLocalData = (token) => {
        try {
            AsyncStorage.setItem('userData', token)
        } catch (e) {
            this.setState({ isSnakbarVisible: true, snakbarMessage: e, snakbarErrorType:'error' })
        }
    }

    passwordToggal = (toggal) => {
        const flag = (toggal == true) ? false : true;
        this.setState({isPasswordVisible:flag});
    }
    
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            keyboardState: 'opened'
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardState: 'closed'
        });
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
            <StatusBar translucent={true} backgroundColor={styleConstant.PRIMARY_COLOR} /> 
                
                <Animatable.View style={[styleConstant.layoutContainer, {backgroundColor:styleConstant.PRIMARY_COLOR}]} >
                    <ScrollView showsVerticalScrollIndicator={false}>  

                        <View style={{marginTop:30, flexDirection:'row', alignItems:'center'}}>
                            <View>
                                <Image
                                    style={styles.logo}
                                    source={images.logo}
                                    resizeMode={"cover"}
                                />
                            </View>
                            <View>
                                <Text style={styles.appName}>EMFOUR POS</Text>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal:20, paddingTop:"15%", position:'relative', height:225}}>
                            <View style={{top:"15%", left:"30%", zIndex: 1, position: 'absolute' }}>
                                <Image
                                    style={styles.centerFood}
                                    source={images.main_screen_food}
                                    resizeMode={"cover"}
                                />
                            </View>
                        </View>

                        <View style={{  paddingHorizontal:10 }}>
                            <Text style={styles.resText}>MGL</Text>
                            <Text style={styles.resText}>Restaurant</Text>
                        </View>

                        <View style={{  paddingHorizontal:10, paddingTop:10 }}>
                            <View>
                                <View>
                                    <Text style={styles.inputTextLabel}>Username</Text>
                                </View>
                                <View style={{ position:'relative' }}>
                                    <TextInput 
                                    style = {[styles.inputText, styleConstant.inputBg]}
                                    underlineColorAndroid = "transparent"
                                    autoCapitalize = "none"
                                    onChangeText = {this.handelUsername}/>
                                </View>
                            </View>
                            <View style={{marginTop:10}}>
                                <View>
                                    <Text style={styles.inputTextLabel}>Password</Text>
                                </View>
                                <View style={{ position:'relative' }}>
                                    <TextInput style = {[styles.inputText, styleConstant.inputBg]}
                                    underlineColorAndroid = "transparent"
                                    secureTextEntry={(this.state.isPasswordVisible == true) ? false : true} 
                                    autoCapitalize = "none"
                                    onChangeText = {this.handelPassword}/>
                                    <View style={{ position:'absolute', top:8, right:20, width:30}}>
                                        <Pressable onPress={() => this.passwordToggal(this.state.isPasswordVisible)}>
                                            <FontAwesome name={(this.state.isPasswordVisible==false) ? 'eye-slash' : 'eye'} size={27} color={styleConstant.FONT_PRIMARY_COLOR} />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                        

                        <View style={{  paddingHorizontal:10, paddingTop:15 }}>
                            <Pressable  disabled={(isLoading == true) ? true : false} onPress={() => this.handelLogin()}>

                                <View style={styles.appButtonContainer}>
                                    <View style={{ flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent:'center' }}>
                                        
                                        
                                        { isLoading == false ?
                                            <View>
                                                <Text style={styles.btnTitle}>Login</Text>
                                            </View>
                                        :
                                            <ActivityIndicator animating={true} size={22} color={styleConstant.FONT_WHITE}  />
                                        }

                                    </View>
                                </View>

                            </Pressable>
                        </View>
                    

                    </ScrollView> 
                </Animatable.View>
                
                {this.state.keyboardState == 'closed' && this.state.isSnakbarVisible == false &&
                <View style={{bottom:0, zIndex: 0, position: 'absolute', width:"50%"  }}>
                    <Image
                        style={styles.bottomImage}
                        source={images.main_screen_bottom_left}
                        resizeMode={"cover"}
                    />
                </View>
                }

                {this.state.keyboardState == 'closed' && this.state.isSnakbarVisible == false &&
                <View style={{bottom:0, right:0, zIndex: 0, position: 'absolute', width:"50%" }}>
                    <Image
                        style={styles.bottomImage}
                        source={images.main_screen_bottom_right}
                        resizeMode={"cover"}
                    />
                </View>
                }

            <Snackbar
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
            </Snackbar>


        </SafeAreaView>
        );
    }
}

export default Login

const styles = StyleSheet.create({
    logo:{
        width:100,
        height:60
    },
    appName:{
        fontSize:styleConstant.FONT_SIZE_SMALL, 
        fontWeight:"900", 
        fontFamily:'Mulish-Regular',
        color:styleConstant.LOGO_COLOR
    },
    centerFood:{
        width:180,
        height:180
    },
    centerFoodSecond:{
        width:120,
        height:120
    },
    resText:{
        fontSize:styleConstant.FONT_SIZE_3XLARGE, 
        fontWeight:"900", 
        fontFamily:'Mulish-Regular',
        color:styleConstant.CATE_TILES_BG,
        lineHeight:40
    },
    inputTextLabel:{
        fontSize:styleConstant.FONT_SIZE_MEDIUM, 
        fontWeight:"500", 
        fontFamily:'Mulish-Regular',
        paddingBottom:7
    },
    inputText:{
        borderRadius:50,
        padding:8,
        fontSize:18,
        fontWeight:'700',
        paddingLeft:20,
        fontFamily: 'Mulish-Regular',
        color:styleConstant.CATE_TILES_BG
    },
    btnTitle:{
        fontSize:styleConstant.FONT_SIZE_MEDIUM, 
        fontWeight:"700", 
        fontFamily:'Mulish-Regular',
        color:styleConstant.FONT_WHITE
    },
    appButtonContainer: {
        elevation: 1,
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 12, 
        backgroundColor:'#000',
        marginBottom:50,
    },
    bottomImage:{
        width:200,
        height:60
    }
});
