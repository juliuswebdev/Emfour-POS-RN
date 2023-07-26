import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GuestStack from "./src/screens/GuestStack";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="GuestStack">
      <Stack.Screen name="GuestStack" component={GuestStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

