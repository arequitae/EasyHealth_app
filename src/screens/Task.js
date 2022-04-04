import React from "react";
import{View, Text, StyleSheet} from "react-native";
import { getWidth,getHeight } from './../utils/Adapter';


const Task = (props) =>{
    return(
        <View style = {styles.item}>
            <View style = {styles.itemLeft}>
                <View style ={styles.square}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:"#FFE3AA",
        padding:getHeight(15),
        borderRadius:getWidth(20),
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:getHeight(20),

    },
    itemLeft:{
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap"

    },
    square:{
        width:getWidth(24),
        height:getWidth(24),
        backgroundColor:"#802115",
        opacity:0.4,
        borderRadius:getWidth(5),
        marginRight:getWidth(15),
    },
    itemText:{
        maxWidth:"80%",
    },
    circular:{
        width:getWidth(12),
        height:getWidth(12),
        borderColor:"#802115",
        borderWidth:getWidth(2),
        borderRadius:getWidth(5)
    }

});

export default Task;