import React from 'react'
import { ScrollView, View, StyleSheet, Image,TouchableOpacity,Text } from 'react-native';
import { getWidth,getHeight } from '../utils/Adapter';
import { useEffect, useState } from 'react';

const DetectionScreen=function(){
    const [food,setFood]=useState('');
    const [nutrient,setNutrient]=useState({
        energy:0,
        protein:0,
        fat:0,
        carbs:0
    });
    useEffect(()=>{
        setFood('Apple');
        setNutrient({
            energy:10,
            protein:0,
            fat:0,
            carbs:0
        })
    },[]);
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imgArea}>
                <Image style={styles.img} 
                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                    }}
                />
            </View>
            <View style={styles.btnArea}>
                   <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Camera</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Choose from Album</Text>
                   </TouchableOpacity>
            </View> 
            <View style={styles.resultArea}>
                <Text style={styles.resultTableTitleText}>Result</Text>
                    <View style={styles.resultTableTitle}>
                        <Text style={styles.resultTableTitleText}>Food</Text>
                        <Text style={styles.resultTableTitleText}>Nutrients</Text>
                    </View>
                    <View style={styles.resultTable}>
                        <View style={{...styles.resultTableColumn,borderRightWidth:2}}>
                            <Text style={styles.tableText}>{food}</Text>
                        </View>
                        <View style={styles.resultTableColumn}>
                            <Text style={styles.tableText}>Energy: {nutrient.energy} kcal</Text>
                            <Text style={styles.tableText}>Protein: {nutrient.protein} g</Text>
                            <Text style={styles.tableText}>Fat: {nutrient.fat} g</Text>
                            <Text style={styles.tableText}>Carbs: {nutrient.carbs} g</Text>
                        </View>
                    </View>
            </View>
            <TouchableOpacity style={{...styles.btn,backgroundColor:'#f5a55a',paddingHorizontal:40, marginTop:getHeight(20)}}>
                        <Text style={styles.btnText}>ADD</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff',
        alignItems:'center'
    },
    imgArea:{
        width:getWidth(328),
        height:getHeight(181)
    },
    img:{
        width:'100%',
        height:'100%'
    },
    btnArea:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:getWidth(328),
        height:getHeight(35)
    },
    btn:{      
        height:getHeight(35),
        borderRadius:getWidth(8),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#6fd0fa'
    },
    btnText:{
        fontSize:20,
        color:'white',
        paddingHorizontal:10,
    },
    resultArea:{
        // height:getHeight(198),
        width:getWidth(328),
        marginTop:getHeight(30),
        
    },
    resultTableTitle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:getHeight(15)
    },
    resultTableTitleText:{
        fontSize:20,
        color:'black',
        fontWeight:'700',
    },
    resultTableColumn:{
        height:getHeight(200),
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    resultTable:{
        flexDirection:'row',
    },
    tableText:{
        fontSize:18,
        fontWeight:"500",
        color:'black'
    }
})

export default DetectionScreen;