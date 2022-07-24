import {Text, TextInput, TouchableOpacity, View, StyleSheet, Alert,ScrollView} from "react-native";
import {getHeight, getWidth} from "../utils/Adapter";
import React, {useEffect, useState} from "react";
import Card from "../basicComponent/Card";
import {useLayer} from "../basicComponent/Dialog";
import DietInfoLayer from "../basicComponent/DietInfoLayer";
import Bar from "../basicComponent/Bar";
import { getToken } from "../utils/Storage";

function getData(query,setData){

    let recipeUrl=`http://${global.serverUrl}/recipe/search?q=${query}&num=1`;
    getToken().
        then(token => {
        fetch(recipeUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            },

        })
            .then(response=>response.json())
            .then(body=>{
                let data=body.data;
                let res=[];
                for(let item of data){
                    res.push({title:item.label,imgUri:item.image,...item})
                }
                setData(res)
            })
            .catch(
                e=>
                {console.error(e)}
            )
    })

}

const RecipeScreen=function(props){
    const layer=useLayer(DietInfoLayer)
    const [data,setData]=useState([]);
    const [query,setQuery]=useState("");

    useEffect(()=>{

    },[])
    const listCard=data.map((item) =>{
        return (<Card item={item} key={item.id} layer={layer}></Card>)
    })
    const guessLike=()=>{
        let recipeUrl=`http://${global.serverUrl}/recipe/recommend`;
        getToken().
        then(token => {
            fetch(recipeUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':token
                },

            })
                .then(response=>response.json())
                .then(body=>{
                    let data=body.data;
                    let res=[];
                    for(let item of data){
                        res.push({title:item.label,imgUri:item.image,...item})
                    }
                    setData(res)
                })
                .catch(
                    e=>
                    {console.error(e)}
                )
        })
    }
    return(
        <ScrollView
            contentContainerStyle={{flexDirection: 'column',alignItems: 'center',justifyContent: 'flex-start',width:'100%',paddingBottom:50,backgroundColor:'white'}}>
            <Bar title="RECIPE" goBack={props.navigation.goBack}/>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around', marginTop:getHeight(20),width:'90%'}}>
                <TextInput style={styles.addTextInput} placeholder={"Recipe Name"} onChangeText={(e)=>{setQuery(e)}}></TextInput>
                <TouchableOpacity style={{...styles.btn,backgroundColor:'#f5a55a',paddingHorizontal:20}}
                onPress={()=>{getData(query,setData)}}
                >
                    <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:getHeight(20)}}>
                <TouchableOpacity style={{...styles.btn,backgroundColor:'#64dd8c',paddingHorizontal:20}}
                                  onPress={guessLike}
                >
                    <Text style={styles.btnText}>Guess You Like ~</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardList}>
                {listCard}
            </View>

        </ScrollView>

    )
}
export default  RecipeScreen;
const styles=StyleSheet.create({
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
        paddingHorizontal:6,
    },
    addTextInput:{
        width:getWidth(189),
        height:getHeight(48),
        borderColor:'gray',
        borderWidth: 2,
        borderRadius: 16,
        paddingLeft:20,
        fontSize: 18
    },
    cardList:{flexDirection: 'row',alignItems: 'center',justifyContent:'flex-start',flexWrap:'wrap',width:getWidth(330),marginTop:20}
})