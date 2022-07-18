import React from 'react';
import {ScrollView, View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import { getWidth,getHeight } from '../utils/Adapter';
import { useEffect, useState } from 'react';
import { choosePhoto, takePhoto } from '../utils/uploadImg';
import Bar from '../basicComponent/Bar'
import {getToken} from "../utils/Storage";


const DetectionScreen=function(props){
    const [food,setFood]=useState('');
    const [nutrient,setNutrient]=useState({
        energy:0,
        protein:0,
        fat:0,
        carbs:0
    });
    const [gram,setGram]=useState(1)
    const [uri,setUri]=useState('')
    useEffect(()=>{
        setFood('-');
        setNutrient({
            energy:0,
            protein:0,
            fat:0,
            carbs:0
        })
    },[]);
    const addCal=function(){
        let addGram=Math.ceil(nutrient.energy*gram/100);
        getToken().
        then(token => {
            let url=`http://${global.serverUrl}/recipe/saveCalories?calories=${addGram}`
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token
                },
            }).then((Response)=>Response.json())
                .then(v=>{
                    if(v.data){
                        console.log(v.data)
                    }
                })
        })
    }
    const goBackFun=function(){
        props.navigation.goBack();

    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Bar title={"Ingredient".toUpperCase()} goBack={goBackFun}/>
            <View style={styles.imgArea}>
                <Image style={styles.img} 
                    source={{
                        uri
                    }}
                />
            </View>
            <View style={styles.btnArea}>
                   <TouchableOpacity style={styles.btn} onPress={takePhoto.bind(this,setUri,setNutrient)}>
                        <Text style={styles.btnText}>Camera</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.btn} onPress={choosePhoto.bind(this,setUri,setNutrient,setFood)}>
                        <Text style={styles.btnText}>Choose from Album</Text>
                   </TouchableOpacity>
            </View> 
            <View style={styles.resultArea}>
                <Text style={styles.resultTableTitleText}>Result</Text>
                    <View style={styles.resultTableTitle}>
                        <Text style={styles.resultTableTitleText}>Food</Text>
                        <Text style={styles.resultTableTitleText}>NRV</Text>
                    </View>
                    <View style={styles.resultTable}>
                        <View style={{...styles.resultTableColumn,borderRightWidth:2}}>
                            { food==="Detecting ~~"?
                                <Text style={{...styles.tableText,color:'orange',fontWeight:'700'}}>{food}</Text>:
                                <Text style={styles.tableText}>{food}</Text>
                            }
                        </View>
                        <View style={styles.resultTableColumn}>
                            <Text style={styles.tableText}>Energy: {nutrient.energy} kcal</Text>
                            <Text style={styles.tableText}>Protein: {nutrient.protein} g</Text>
                            <Text style={styles.tableText}>Fat: {nutrient.fat} g</Text>
                            <Text style={styles.tableText}>Carbs: {nutrient.carbs} g</Text>
                        </View>
                    </View>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around', marginTop:getHeight(20),width:'90%'}}>
                <TextInput style={styles.addTextInput} placeholder={"  Food Weight(g)"}
                onChangeText={(e)=>{setGram(Number.parseFloat(e))}}
                ></TextInput>
                <TouchableOpacity style={{...styles.btn,backgroundColor:'#f5a55a',paddingHorizontal:20}}
                onPress={addCal}
                >
                    <Text style={styles.btnText}>ADD</Text>
                </TouchableOpacity>

            </View>

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

        borderWidth:1,
        width:getWidth(328),
        height:getHeight(181),
        marginVertical:20
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
    },
    addTextInput:{
        width:getWidth(189),
        height:getHeight(40),
        borderColor:'gray',
        borderWidth: 2,
        borderRadius: 16
    }
})

export default DetectionScreen;