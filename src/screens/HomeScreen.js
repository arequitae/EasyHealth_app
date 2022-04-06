import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import Task from "./Task";
import {KeyboardAvoidingView} from "react-native";
import { getHeight,getWidth } from "../utils/Adapter";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import ModalDropdown from 'react-native-modal-dropdown';

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: {
        fontSize: 11
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



const HomeScreen = ({ navigation }) => {
    const [task, setTask] = useState();
    const [tasktype, setTasktype] = useState();
    const [tasklist, setTasklist] = useState({swim: 0,bike:0,run:0})
    const [taskItems, setTaskItems] = useState([]);
    const data = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [Number(tasklist.swim)/40, Number(tasklist.bike)/40, Number(tasklist.run)/60]
    };


    const handleAddTask = () =>{
        setTaskItems([...taskItems, tasktype+"@" + task])
        setTask(null)
        setTasktype(null)
        if (tasktype =='Swim'){
            let num = Number(tasklist.swim)
            setTasklist({...tasklist,swim: num+Number(task)})
            
        }
        if (tasktype =='Bike'){
            let num = Number(tasklist.bike)
            setTasklist({...tasklist,bike: num+Number(task)})
        }
        if (tasktype =='Run'){
            let num = Number(tasklist.run)
            setTasklist({...tasklist,run: num+Number(task)})
        }

    }

    const completeTask = (index) =>{
        let itemsCopy = [...taskItems];
        let str=itemsCopy.splice(index,1)[0];
        let type=str.substr(0,str.indexOf('@'))
        let duration=str.substr(str.indexOf('@')+1)
        if (type =='Swim'){
            let num = Number(tasklist.swim)
            setTasklist({...tasklist,swim: num-Number(duration)})
            
        }
        if (type =='Bike'){
            let num = Number(tasklist.bike)
            setTasklist({...tasklist,bike: num-Number(duration)})
        }
        if (type =='Run'){
            let num = Number(tasklist.run)
            setTasklist({...tasklist,run: num-Number(duration)})
        }
        setTaskItems(itemsCopy)
    }


    return (
        <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: getHeight(29) }}>
            <View style={{ padding: 8, margin: 8 }}>
                <Text style={styles.textTitle}>Today's Finished Tasks</Text>
                <View style={styles.items}>
                    {
                        taskItems.map((item,index)=>{
                            let type=item.substr(0,item.indexOf('@'))
                            let duration=item.substr(item.indexOf('@')+1)
                            return (
                                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                                    <Task text={ type+" for " + duration+"min "} tasktype={item} />
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
                    <ModalDropdown 
                          options={['Swim', 'Bike','Run']}
                          defaultValue = "Type"
                          textStyle = {{fontSize:13}}
                          dropdownTextStyle = {{fontSize:15, textAlign: 'center'}}
                          dropdownStyle = {{width:80, height:130}}
                          style = {styles.options}
                          onSelect={(idx, value) => setTasktype(value)}/>
                    <TextInput 
                          style={styles.input} 
                          placeholder={"Please set time(min)"} 
                          value = {task} 
                          keyboardType="number-pad"
                          onChangeText={text =>setTask(text)}/>
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
                        height={getWidth(230)}
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
        width: getHeight(180),
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
    },
    options:{
        paddingVertical: getHeight(15),
        paddingHorizontal: getWidth(15),
        width: getWidth(100),
        backgroundColor: "#fff",
        borderRadius: getWidth(10),
        borderColor: "#802115",
        borderWidth:getWidth(2)

    }
 


}
)