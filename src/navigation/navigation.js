import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from 'react';
import HomeScreen from "../screens/HomeScreen";
import DataScreen from "../screens/DataScreen";
import ChatScreen from "../screens/ChatScreen";
import HomeScreenV2 from './../screens/HomeScreen2';
import Game from "../screens/Game";



const Tab = createBottomTabNavigator();

const EHeathChatBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: 0,
      justifyContent: "center",
      alignItems: "center",
      ...style.shadow
    }}
    onPress={onPress}>
    <View style={{
      width: 50,
      height: 50,
      borderRadius: 35,
      backgroundColor: "#3498DB"

    }}>
      {children}
    </View>
  </TouchableOpacity>

);


const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        "headerStyle":{
          backgroundColor:"#f8f8f8",
        },
        "headerTitleStyle":{
          textAlign:"center",
          fontWeight:"bold",
          letterSpacing:2
        },
        "headerTitleAlign": 'center',
        "headerTintColor":"#3498DB",
        "tabBarShowLabel": false,
        "tabBarStyle": [
          {
            "display": "flex",
            "elevation": 0,
            "backgroundColor": "#f8f8f8",
            "height": 60,
            ...style.shadow

          },
          null
        ]

      }}
    >
      <Tab.Screen name="TODAY'S GOAL" component={HomeScreenV2} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
            <Image
              source={require('../img/home.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                // tintColor: focused ? '#e32f45' : '#748c94',
              }}
            />
            <Text
              style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, marginBottom: 15 }}>
              HOME</Text>
          </View>
        )
      }} />
      <Tab.Screen name='Chat' component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
            <Image
              source={require('../img/game.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                // tintColor: focused ? '#e32f45' : '#748c94',
              }}
            />
            <Text
              style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, marginBottom: 15 }}>
              CHAT</Text>
          </View>
            // <Image
            //   source={require('../img/game.png')}
            //   resizeMode="center"
            //   style={{
            //     width: 50,
            //     height: 50,
            //     // tintColor: "#fff",

            //   }}
            // />
          ),
          // tabBarButton: (props) => (
          //   <EHeathChatBarButton {...props} />
          // )
        }}

      />
      <Tab.Screen name='Data' component={DataScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
            <Image
              source={require('../img/profile.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                // tintColor: focused ? '#e32f45' : '#748c94',
              }}
            />
            <Text
              style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, marginBottom: 15 }}>
              DATA</Text>
          </View>
        )
      }} />
    </Tab.Navigator>

  );
}


const style = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})



export default Tabs;