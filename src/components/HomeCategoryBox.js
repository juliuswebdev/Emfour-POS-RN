
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, View, Text, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";

import * as Animatable from 'react-native-animatable';
import styleConstant from '../styles/index';
import images from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Font from 'expo-font';
import apiUrl from '../constants/apiUrl';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};

class HomeCategoryBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fontsLoaded: false,
        };
    }
  
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded:true});
    }
  
    
    async componentDidMount() {
        this._loadFontsAsync();
    }
  
  
    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        let { id, name, logo } = this.props.data;
        return (
            <View>
                <Pressable onPress={() => 
                    this.props.navigation.navigate('Products', { 
                        category_id: id,
                        category_name: name
                    }) 
                }>
                    <View style={styles.categoryWrapper}>
                        <View>
                            <Image
                                style={styles.imageStyle}
                                source={{uri : apiUrl.CAT_LOGO+logo}}
                                resizeMode={"cover"}
                            />
                        </View>
                        <View>
                            <Text style={styles.categoryTitle}>
                                {name}
                            </Text>
                        </View>
                    </View> 
                </Pressable>
                
                
            </View>

        );
    }
}
export default HomeCategoryBox

const styles = StyleSheet.create({

    categoryWrapper:{
        padding:20,
        backgroundColor:'#fff',
        borderRadius: 20,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15,
        margin: 5
    },
    subCategoryArea:{
        marginBottom:30
    },
    subCategoryList: {
        marginBottom: 2
    },
    imageStyle:{
        width:100,
        height:100
    },
    categoryTitle:{
        paddingLeft:15,
        fontSize:styleConstant.FONT_SIZE_XLARGE, 
        fontWeight:700, 
        color:styleConstant.FONT_BLACK 
    }
});
