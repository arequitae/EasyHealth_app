import React, {useState, Component, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { getWidth,getHeight } from './../utils/Adapter';
import { useLayer } from './../basicComponent/Dialog';
import {getToken} from "../utils/Storage";

class Layer extends Component {
    constructor(props){
        super(props);

    }
    state={
        type:'',
        time:'',
    }


    render() {
      return (
        <View style={{borderWidth:5,borderColor:'#93c0b6',width: getWidth(300), height: getHeight(230), alignItems: 'center', justifyContent: 'space-around', borderRadius: 10, backgroundColor: '#fff'}}>
            <View style={{flexDirection:'row',alignItems:'center',height:getHeight(50)}}>
                <Text style={{fontSize: 20, color: '#000',width:getWidth(100),fontWeight:'500'}}>Type:</Text>
                <TextInput style={{borderWidth:1,width:getWidth(100),fontSize:20,fontWeight:'500'}}
                    onChangeText={(e)=>{this.setState({...this.state,type:e})}}
                ></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',height:getHeight(50)}}>
                <Text style={{fontSize: 20, color: '#000',width:getWidth(100),fontWeight:'500'}}>Time(min):</Text>
                <TextInput style={{borderWidth:1,width:getWidth(100),fontSize:20,fontWeight:'500'}}
                    onChangeText={(e)=>{this.setState({...this.state,time:e})}}
                ></TextInput>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',height:getHeight(40),justifyContent:'flex-end',width:'90%'}}>
                {/* <TouchableOpacity style={{...styles.modalBtn,backgroundColor:'orange'}}>
                    <Text style={{fontSize:20,color:'white'}}>Cancel</Text>
                </TouchableOpacity> */}

                {/* ok按钮修改target数据 */}
                <TouchableOpacity style={{...styles.modalBtn,backgroundColor:'#2dc9eb'}}
                    onPress={()=>{this.props.setExercise({...this.props.exercise,target:this.state.time})}}
                >
                    <Text style={{fontSize:20,color:'white',fontWeight:'500'}}>OK</Text>
                </TouchableOpacity> 
            </View>
        </View>
      );
    }
  }
  


const HomeScreenV2=function(props){
    const layer=useLayer(Layer)

    const [{calorieTarget,calorieFinished},setCalorie]=useState({
        calorieTarget:'1320-1980',
        calorieFinished:'0'
    })
    const [exercise,setExercise]=useState({
        target:60,
        finished:30
    })
    const targetRequest= async function(token){
        let url=`http://${global.serverUrl}/bodydata/latest`
        let res="";
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            }
        }).then((Response)=>Response.json())
            .then(v=>{
                if(v.data){
                    let bodyData=v.data;
                    // setCalorie({
                    //     calorieTarget:,
                    //     calorieFinished
                    // });
                    res=`${Math.ceil(bodyData.weight*22)}-${Math.ceil(bodyData.weight*33)}`
                }
            })
        return res;
    }
    const finishRequest =async function(token,str){
        let url=`http://${global.serverUrl}/recipe/getCalories`
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            }
        }).then((Response)=>Response.json())
            .then(v=>{
                if(v.data){
                    setCalorie({
                        calorieTarget:str,
                        calorieFinished:v.data
                    });
                }
            })
    }

    useEffect(()=>{
        const unsubscribe = props.navigation.addListener('focus', () => {//当页面focus的时候重新获取数据
            getToken()
                .then(
                    (token)=>{
                        targetRequest(token).then((str)=>{
                            finishRequest(token,str)
                        })

                    }
                )
        });
        return unsubscribe;//销毁
    },[props.navigation])
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Let's Start →</Text>
            <View style={styles.pressArea}>
                <TouchableOpacity style={{...styles.Touchable,...styles.CalDet}}
                  onPress={()=>{props.navigation.navigate("CalDetect")}}
                >
                    <Text style={{fontSize:18,color:'white'}}>Nutrients Detection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.Touchable,...styles.CusRec}}
                                  onPress={()=>{props.navigation.navigate("Recipe")}}
                >
                    <Text style={{fontSize:18,color:'white'}}>Custom Recipes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.Touchable,...styles.QA}}
                                  onPress={()=>{props.navigation.navigate("Game",{target:calorieTarget})}}
                >
                    <Text style={{fontSize:18,color:'white'}}>Game</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Calorie Intake (cal)</Text>
            <View style={styles.dataArea}>
                <View style={{...styles.subArea,borderRightWidth:2}}>
                    <Text style={styles.targetText}>TARGET</Text>
                    <Text style={styles.dataText}>{calorieTarget}</Text>
                </View>  
                <View style={styles.subArea}>
                    <Text style={styles.finishedText}>FINISHED</Text>
                    <Text style={styles.dataText}>{calorieFinished}</Text>
                </View>  
            </View>
            <View style={styles.exerciseTitleArea}>
                <Text style={styles.exerciseTitle}>Exercise Time (min)</Text>
                {/* 修改锻炼时间，layer.show是用来显示弹窗的，然后传入exercise的setter和当前值，在layer中改变 */}
                <TouchableOpacity style={styles.addBtn}
                onPress={()=>layer.show({setExercise,exercise})}
                > 
                    <Image
                    source={require('../img/edit.png')}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                    }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.dataArea}>
                <View style={{...styles.subArea,borderRightWidth:2}}>
                    <Text style={styles.targetText}>TARGET</Text>
                    <Text style={styles.dataText}>{exercise.target}</Text>
                </View>  
                <View style={styles.subArea}>
                    <Text style={styles.finishedText}>FINISHED</Text>
                    <Text style={styles.dataText}>{exercise.finished}</Text>
                </View> 
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffffff',
        alignItems:'center'
    },
    title:{fontSize:20,color:'black',fontWeight:'700',alignSelf:'flex-start',marginLeft:getWidth(17),marginTop:getHeight(17)},
    pressArea:{
        marginLeft:getHeight(5),
        marginRight:getHeight(5),
        marginBottom:getHeight(5),
        height:getHeight(205),
        width:getWidth(318),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    Touchable:{
        width:getWidth(93),
        height:getHeight(164),
        borderRadius:getWidth(20),
        justifyContent:'center',
        alignItems:'center',
    },
    CalDet:{
        backgroundColor:'#f28f37'
    },
    CusRec:{
        backgroundColor:'#5d9858'
    },
    QA:{
        backgroundColor:'#629cf1',
    },
    dataArea:{
        margin:getHeight(5),
        width:getWidth(326),
        height:getHeight(100),
        borderWidth:2,
        borderColor:'black',
        borderRadius:20,
        flexDirection:'row',
    },
    subArea:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    targetText:{
        fontSize:20,
        color:'red',
        fontStyle:'italic',
        fontWeight:'600',
        paddingRight:getWidth(40)
    },
    finishedText:{
        fontSize:20,
        color:'gray',
        fontStyle:'italic',
        fontWeight:'600',
        paddingRight:getWidth(40)
    },
    dataText:{
        fontSize:20,
        color:'black',
        fontWeight:'500',

    },
    exerciseTitleArea:{
        width:getWidth(326),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:getHeight(17)
    },
    exerciseTitle:{
        fontSize:20,
        color:'black',
        fontWeight:'700',
    },
    addBtn:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center',

    },
    modalBtn:{width:getWidth(60),height:getHeight(40),borderRadius:10,alignItems:'center',justifyContent:'center'}

})

export default HomeScreenV2; 