import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import Task from "./Task";
import {KeyboardAvoidingView} from "react-native";
import { getHeight,getWidth } from "../utils/Adapter";


const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
        fontSize: 13
    },
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
};

const HomeScreen = ({ navigation }) => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () =>{
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (index) =>{
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index,1);
        setTaskItems(itemsCopy)
    }


    return (
        <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: getHeight(29) }}>
            <View style={{ padding: 8, margin: 8 }}>
                <Text style={styles.textTitle}>Today's Tasks</Text>
                <View style={styles.items}>
                    {
                        taskItems.map((item,index)=>{
                            return (
                                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                                <Task text={item} />


                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
            </View>
            <View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeTaskWrapper}>
                    <TextInput style={styles.input} placeholder={"Write a task"} value = {task} onChangeText={text =>setTask(text)}/>
                    <TouchableOpacity>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}  onPress={()=>handleAddTask()}>+</Text>
                    </View>
                </TouchableOpacity>
                </KeyboardAvoidingView>
                
            </View>



            <View style={{ padding: 8, margin: 8 }}>
                <Text style={styles.textTitle}>Exercise Tasks</Text>

                <View>
                    <ProgressChart
                        data={data}
                        width={getWidth(330)}
                        height={getWidth(200)}
                        strokeWidth={getWidth(16)}
                        radius={getWidth(32)}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={{
                            marginVertical: getHeight(10),
                            borderRadius: getWidth(16)
                        }}
                    />
                </View>
            </View>
        </ScrollView>




    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    textTitle: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "black"
    },
    items: {
        marginTop: getHeight(30)
    },
    writeTaskWrapper: {
        position: "relative",
        bottom: getHeight(10),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        paddingVertical: getHeight(10),
        paddingHorizontal: getWidth(15),
        width: getHeight(250),
        backgroundColor: "#fff",
        borderRadius: getWidth(60),
        borderColor: "#802115",
        borderWidth:getWidth(2)
    },
    addWrapper:{
        width:getWidth(40),
        height:getWidth(40),
        backgroundColor:"#fff",
        borderRadius:getWidth(40),
        justifyContent:"center",
        borderColor: "#802115",
        borderWidth:getWidth(2),
       
    },
    addText:{
        fontSize:18,
        textAlign:'center'
    }
 


}
)