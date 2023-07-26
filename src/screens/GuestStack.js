import React, { useState, Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from "./Splash";
import Login from "./Login";
import Home from "./Home";
import Checkout from "./Checkout";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
// import GeneralSettings from "./GeneralSettings";
import SideDrower from "./SideDrower";

const Stack = createNativeStackNavigator();
export default function GuestStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
        {/* <Stack.Screen name="GeneralSettings" component={GeneralSettings} options={{ headerShown: false }} /> */}
        <Stack.Screen name="SideDrower" component={SideDrower} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
