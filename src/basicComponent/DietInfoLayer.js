import React, {Component} from "react";
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Image} from "react-native";
import {getHeight, getWidth} from "../utils/Adapter";

class DietInfoLayer extends Component {
    constructor(props){
        super(props);

    }
    dietList=this.props.item.dietLabels.map((item, index) => {
        return(
            <Text style={styles.dataText} key={`${index}diet`}>{item}</Text>
        )
    });
    healthList= this.props.item.healthLabels.slice(0,5).map((item, index) => {
            return(
                <Text style={styles.dataText} key={`${index}health`}>{item}</Text>
            )
        });
    ingredientList= this.props.item.ingredientLines.map((item, index) => {
        return(
            <Text style={styles.dataText} key={`${index}health`}>{`${index+1}. ${item}.`}</Text>
        )
    });
    render() {
        console.log(this.props.dietLabels)
        return (
            <View style={{borderWidth:5,borderColor:'#93c0b6',width: getWidth(355), height: getHeight(600), alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#fff'}}>
                <View style={styles.label}>
                    <Text style={styles.dataTitle}>{this.props.item.title}</Text>
                </View>
                <View style={styles.imgArea}>
                    <Image style={styles.img}
                           source={{
                               uri:this.props.item.imgUri
                           }}
                    />
                    <View style={{flex:1,justifyContent:'center',marginLeft: 10}}>
                        <Text style={styles.ingredientTitle} >Ingredient</Text>
                        {this.ingredientList}
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={{...styles.data,borderRightWidth:1}}>
                        <Text style={styles.dataTitle}>Calories</Text>
                        <View style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent:'center'}}>
                            <Text style={{...styles.dataText,fontSize:25,fontWeight:'700'}}>{this.props.item.calories.toFixed(1)}</Text>
                            <Text style={styles.dataText}>Kcal</Text>
                        </View>
                    </View>
                    <View style={{...styles.data,borderRightWidth:1}}>
                        <Text style={styles.dataTitle}>Diets Label</Text>
                        <View style={{flex:1,justifyContent:'center'}}>
                        {this.dietList}
                        </View>
                    </View>
                    <View style={styles.data}>
                        <Text style={styles.dataTitle}>Health Label</Text>
                        <View style={{flex:1,justifyContent:'center'}}>
                        {this.healthList}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    label:{
        height:getHeight(30),
        width:'80%',
        backgroundColor:'#deedce',
        alignItems:'center',
    },
    imgArea:{
        marginTop:20,
        flexDirection: 'row',
        width:"100%",
        justifyContent: 'flex-start',
        paddingLeft: "5%"
    },
    img:{
        borderRadius:10,
        width:getWidth(140),
        height:getHeight(180),
    },
    dataContainer:{
       width:"90%",
        height:'35%',
        borderTopWidth:2,
        borderColor:'lightgrey',
        flexDirection:'row',
        paddingTop:10,
        marginTop:15,
    },
    data:{
        flex:1,
        borderColor:'lightgrey',
        paddingLeft:5
    },
    dataTitle:{
        fontSize:18,
        fontWeight:'600',
        fontColor:'black',
    },
    ingredientTitle:{
        fontSize:20,
        fontWeight:'700',
        fontColor:'black',
        marginBottom:8
    },
    dataContent:{
        flex:1,
        justifyContent:'center',
    },
    dataText:{
        fontSize:16,
        fontWeight:'600'
    },
    ingredient:{
        marginLeft:"5%",
        fontSize:18
    }
})
export default DietInfoLayer;