import {Text, TextInput, TouchableOpacity, View, StyleSheet, Alert,ScrollView} from "react-native";
import {getHeight, getWidth} from "../utils/Adapter";
import React, {useEffect, useState} from "react";
import Card from "../basicComponent/Card";
import {useLayer} from "../basicComponent/Dialog";
import DietInfoLayer from "../basicComponent/DietInfoLayer";

function getData(query,setData){

    let recipeUrl=`http://${global.serverUrl}/recipe/search?q=${query}`;
    console.log(recipeUrl)
    fetch(recipeUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    })
        .then(response=>response.json())
        .then(body=>{
           let data=body.slice(0,10);
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
}

const RecipeScreen=function(){
    const layer=useLayer(DietInfoLayer)
    const [data,setData]=useState([]);
    const [query,setQuery]=useState("");
    let fakedata=[{title:'123',imgUri:'https://s1.ax1x.com/2022/07/03/j8A7vt.png',dietLabels:["Low-Carb"],"healthLabels": [
            "Sugar-Conscious",
            "Low Sugar",
            "Kidney-Friendly",
            "Keto-Friendly",
            "Paleo",
            "Dairy-Free",
            "Gluten-Free",
            "Wheat-Free",
            "Egg-Free",
            "Peanut-Free",
            "Tree-Nut-Free",
            "Soy-Free",
            "Fish-Free",
            "Shellfish-Free",
            "Pork-Free",
            "Crustacean-Free",
            "Celery-Free",
            "Mustard-Free",
            "Sesame-Free",
            "Lupine-Free",
            "Mollusk-Free",
            "Alcohol-Free",
            "Sulfite-Free",
            "FODMAP-Free",
            "Kosher"
        ],
        "ingredientLines": [
            "5 to 6 ounces skirt steak or hanger steak",
            "Salt",
            "Mild-tasting olive oil, to coat, or as needed"
        ],
        "calories": 322.79425}]
    useEffect(()=>{

    },[])
    const listCard=data.map((item, index) =>{
        return (<Card item={item} key={index} layer={layer}></Card>)
    })
    return(
        <ScrollView
            contentContainerStyle={{flexDirection: 'column',alignItems: 'center',justifyContent: 'flex-start', marginTop:getHeight(20),width:'100%',paddingBottom:50}}>
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
                                  onPress={()=>{}}
                >
                    {/*等推荐系统好了这边加上去*/}
                    <Text style={styles.btnText}>Guess You Like ~</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'flex-start',flexWrap:'wrap',width:getWidth(330),marginTop:20}}>
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
    }
})