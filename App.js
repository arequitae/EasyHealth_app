import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from 'react';
import Tabs from "./src/navigation/navigation";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/loginScreen';
import RegisterScreen from './src/screens/registerScreen';


const stack = createStackNavigator();


class App extends Component {
  render() {
    return (
      <NavigationContainer>
          <stack.Navigator headerMode='none'>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Tabs" component={Tabs} />
            <stack.Screen name="Register" component={RegisterScreen} />
          </stack.Navigator>
      </NavigationContainer>
    )
  }
}


export default App;