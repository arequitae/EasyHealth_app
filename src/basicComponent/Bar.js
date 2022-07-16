import React from 'react';
import {View,TouchableOpacity,SafeAreaView, StyleSheet, Text, Image} from "react-native";
import {getHeight, getWidth} from "../utils/Adapter";

const Bar=function(props){
    return(

        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.side} onPress={()=>{props.goBack()}}>
                <Image source={require('../img/back.png')}
                       resizeMode="contain"
                       style={{
                           width: 30,
                           height: 30,
                       }} />
            </TouchableOpacity>
            <Text style={styles.text}>{props.title}</Text>
            <View style={styles.side}></View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f8f8f8',
        width:'100%',
        height:60
    },
    text:{
        color:'#3498DB',
        fontWeight:"bold",
        letterSpacing:1.5,
        fontSize:20,
        textAlign:'center',
        flex:1
    },
    side:{
        width:getWidth(50),
        height:'100%',
        justifyContent: 'center',
        alignItems:'flex-end',
    }
})

export default Bar;