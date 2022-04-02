import {StyleSheet,SafeAreaView,View,Image} from "react-native";
import React, { Component } from 'react';

class Headers extends Component{
    render(){
        return(
            <SafeAreaView>
                
            </SafeAreaView>
        )
    }
}

export default Headers;

const styles = StyleSheet.create({
    safe_area_view:{
        flex: 1
    },
    header:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:16

    }
})