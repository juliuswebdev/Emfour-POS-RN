
import React, { useEffect, useState, Component  } from 'react';
import { Pressable, View, Text, StyleSheet} from "react-native";
import styleConstant from '../styles/index';
import {FontAwesome, Feather} from '@expo/vector-icons';
import * as Font from 'expo-font';
let customFonts = {
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
};


class TopBar extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
          fontsLoaded: false,
          leftIcon:this.props.leftIcon,
          leftAction:this.props.leftAction,
          screenTitle:this.props.screenTitle
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
      <View style={styles.pageHeading}>
          <View>
            <Pressable onPress={() => this.props.navigation.navigate(this.state.leftAction)}>
              <View style={styles.squareShape}>
                <Feather style={{ alignSelf: "center" }} name={this.state.leftIcon} size={35} color={styleConstant.FONT_PRIMARY_COLOR}  />
              </View>
            </Pressable>
          </View>
          <View>
            <Text style={styles.categoryTitle}>{this.state.screenTitle}</Text>
          </View>
      </View>  
      );
    }
}

export default TopBar

const styles = StyleSheet.create({
    pageHeading:{
        backgroundColor:styleConstant.SECONDARY_COLOR, 
        marginTop:30, 
        flexDirection:'row', 
        padding:10,
        alignItems:'center',
        alignContent:'center'
      },
  
  
     
  
      squareShape:{
          height: 40, //any of height
          width: 40, //any of width
          justifyContent:"center",
          backgroundColor:"#64645C",
      },
      categoryTitle:{
        fontSize:styleConstant.FONT_SIZE_2XLARGE - 5, 
        fontWeight:900, 
        color:styleConstant.FONT_PRIMARY_COLOR, 
        fontFamily:'Mulish-Regular',
        paddingLeft:15,
        textTransform: 'uppercase',
        letterSpacing: 1
      }
});
