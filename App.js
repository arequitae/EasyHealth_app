import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from 'react';
import Tabs from "./src/navigation/navigation";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/registerScreen';
import DetectionScreen from './src/screens/DetectionScreen';
import {ModalLayers} from 'react-native-modal-layer';

const stack = createStackNavigator();


class App extends Component {
  render() {
    return (
      <ModalLayers>
    <NavigationContainer>
      <stack.Navigator headerMode='none'>
            
              <stack.Screen name="Login" component={LoginScreen} />
              <stack.Screen name="Tabs" component={Tabs} />
              <stack.Screen name="Register" component={RegisterScreen} />
              <stack.Screen name="CalDetect" component={DetectionScreen} />
              
            </stack.Navigator>

        </NavigationContainer>
        </ModalLayers>
    )
  }
}


export default App;