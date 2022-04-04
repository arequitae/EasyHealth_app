import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from 'react';
import Tabs from "./src/navigation/navigation";


class App extends Component{

  render(){

  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}
}

export default App;