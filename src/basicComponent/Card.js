import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect,useState} from "react";
import {getHeight, getWidth} from "../utils/Adapter";
import {getToken} from "../utils/Storage";
const Card=(props)=>{
    const [love,setLove]=useState(false);
    let addr="";
    useEffect(()=>{
        if(love)addr="../img/heart_green.png"
        else addr="../img/heart_white.png"
    },[love])
    const likeRecipe=()=>{
        setLove(!love);
        if(!love){
            getToken().then((token)=>{
                let url=`http://${global.serverUrl}/recipe/like?id=${props.item.id}`
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
    }
    return(
        <TouchableOpacity  onPress={()=>{
            if(props.layer){
                props.layer.show({item:props.item});
            }
        }}>
        <View style={styles.container}>
            <View style={styles.imgArea}>
                <Image style={styles.img}
                       source={{
                           uri:props.item.imgUri
                       }}
                />
            </View>
            <Text style={styles.text}>
                {props.item.title}
            </Text>
            <TouchableOpacity style={styles.loveImg}
            onPress={likeRecipe}
            >
                {!love?
                <Image style={{width:'100%',height:'100%'}}
                       source={require("../img/heart_white.png")}
                />:
                <Image style={{width:'100%',height:'100%'}}
                       source={require("../img/heart_green.png")}
                />}
            </TouchableOpacity>

        </View>
        </TouchableOpacity>
            )
}
const styles = StyleSheet.create({
    container : {
        margin:5,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:20,
        width:getWidth(155),
        height:getHeight(246),
        justifyContent:'space-between',
        alignItems:'center',
    },
    imgArea:{
        marginTop:20,
        width:getWidth(125),
        height:getHeight(125),

    },
    img:{
        borderRadius:10,
        width:'100%',
        height:'100%'
    },
    text:{
        marginLeft:13,
        marginTop: 10,
        fontSize:16,
        fontWeight:'500',
        alignSelf:'flex-start'
    },
    loveImg:{alignSelf:'flex-end',width:getWidth(29),height:getHeight(29),marginRight:15,marginBottom:10}


})
export default Card;
