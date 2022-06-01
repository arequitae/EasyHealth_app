import React,{useState} from 'react'
import {StyleSheet, Text,View,ScrollView,TouchableOpacity } from 'react-native';
import { getWidth,getHeight } from './../utils/Adapter';

const HomeScreenV2=function(){
    const [calorie,setCalorie]=useState({
        target:'200-300',
        finished:'100'   
    })
    const [exercise,setExercise]=useState({
        target:60,
        finished:30
    })
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Let's Start →</Text>
            <View style={styles.pressArea}>
                <TouchableOpacity style={{...styles.Touchable,...styles.CalDet}}>
                    <Text style={{fontSize:18,color:'white'}}>Calorie Detection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.Touchable,...styles.CusRec}}>
                    <Text style={{fontSize:18,color:'white'}}>Custom Recipes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.Touchable,...styles.QA}}>
                    <Text style={{fontSize:18,color:'white'}}>Question Answering</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Calorie Intake(cal)</Text>
            <View style={styles.dataArea}>
                <View style={{...styles.subArea,borderRightWidth:2}}>
                    <Text style={styles.targetText}>TARGET</Text>
                    <Text style={styles.dataText}>{calorie.target}</Text>
                </View>  
                <View style={styles.subArea}>
                    <Text style={styles.finishedText}>FINISHED</Text>
                    <Text style={styles.dataText}>{calorie.finished}</Text>
                </View>  
            </View>
            <Text style={styles.title}>Exercise Time(min)</Text>
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

    }
})

export default HomeScreenV2; 