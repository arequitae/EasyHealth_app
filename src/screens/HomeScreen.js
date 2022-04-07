import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import Task from "./Task";
import { KeyboardAvoidingView } from "react-native";
import { getHeight, getWidth } from "../utils/Adapter";
import ModalDropdown from 'react-native-modal-dropdown';
import CardView from "react-native-cardview-wayne";

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(38, 91, 106, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(38, 91, 106, ${opacity})`,
    propsForLabels: {
        fontSize: 11
    },
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "8",
        strokeWidth: "2",
        stroke: "#fff"
    }
}



const HomeScreen = ({ navigation }) => {
    const [task, setTask] = useState();
    const [tasktype, setTasktype] = useState();
    const [tasklist, setTasklist] = useState({ swim: 0, bike: 0, run: 0 })
    const [taskItems, setTaskItems] = useState([]);
    const data = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [Number(tasklist.swim) / 40, Number(tasklist.bike) / 40, Number(tasklist.run) / 60]
    };


    const handleAddTask = () => {
        setTaskItems([...taskItems, tasktype + "@" + task])
        setTask(null)
        if (tasktype == 'Swim') {
            let num = Number(tasklist.swim)
            setTasklist({ ...tasklist, swim: num + Number(task) })

        }
        if (tasktype == 'Bike') {
            let num = Number(tasklist.bike)
            setTasklist({ ...tasklist, bike: num + Number(task) })
        }
        if (tasktype == 'Run') {
            let num = Number(tasklist.run)
            setTasklist({ ...tasklist, run: num + Number(task) })
        }

    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        let str = itemsCopy.splice(index, 1)[0];
        let type = str.substr(0, str.indexOf('@'))
        let duration = str.substr(str.indexOf('@') + 1)
        if (type == 'Swim') {
            let num = Number(tasklist.swim)
            setTasklist({ ...tasklist, swim: num - Number(duration) })

        }
        if (type == 'Bike') {
            let num = Number(tasklist.bike)
            setTasklist({ ...tasklist, bike: num - Number(duration) })
        }
        if (type == 'Run') {
            let num = Number(tasklist.run)
            setTasklist({ ...tasklist, run: num - Number(duration) })
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
                        taskItems.map((item, index) => {
                            let type = item.substr(0, item.indexOf('@'))
                            let duration = item.substr(item.indexOf('@') + 1)
                            return (
                                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                    <Task text={type + " for " + duration + "min "} tasktype={item} />
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
                        options={['Swim', 'Bike', 'Run']}
                        defaultValue="Type"
                        textStyle={{ fontSize: 13 }}
                        dropdownTextStyle={{ fontSize: 15, textAlign: 'center' }}
                        dropdownStyle={{ width: 80, height: 130 }}
                        style={styles.options}
                        onSelect={(idx, value) => setTasktype(value)} />
                    <TextInput
                        style={styles.input}
                        placeholder={"Please set time(min)"}
                        value={task}
                        keyboardType="number-pad"
                        onChangeText={text => setTask(text)} />
                    <TouchableOpacity>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText} onPress={() => handleAddTask()}>+</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </View>



            <View style={{ padding: 8, margin: 8 }}>
                <Text style={styles.textTitle}>Completed Progress</Text>
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
            <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                <Text style={styles.textTitle}>Health Tips: </Text>
            </View>
            <CardView style={{
                marginHorizontal: 8,
                // width:getWidth(331)
            }}
                cardElevation={4}
                maxCardElevation={4}
                radius={10}
                backgroundColor={'#ffffff'}>
                <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                    <View>
                        <Text style={styles.textTitleCard}>How to Reduce a Fever Without Medication</Text>
                    </View>
                    <View>
                        <View style={{alignItems:"center"}}>
                        <Image 
                           style={{margin:5,height:150, width:200}}
                           source={require('./tip1.png')}/>
                           </View>

                        <Text style={styles.textCard}>Fever can lead to dehydration which can make the sufferer feel worse. Avoid dehydration by drinking plenty of water or an oral rehydration solution like CeraLyte, Pedialyte.</Text>
                    </View>
                </View>
            </CardView>




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
    textTitleCard: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "black"
    },
    textCard: {
        fontSize: 13,
        letterSpacing: 0.5,
        color: "grey"
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
        borderWidth: getWidth(2)
    },
    addWrapper: {
        width: getWidth(40),
        height: getWidth(40),
        backgroundColor: "#fff",
        borderRadius: getWidth(40),
        justifyContent: "center",
        borderColor: "#802115",
        borderWidth: getWidth(2),

    },
    addText: {
        fontSize: 18,
        textAlign: 'center'
    },
    options: {
        paddingVertical: getHeight(15),
        paddingHorizontal: getWidth(15),
        width: getWidth(100),
        backgroundColor: "#fff",
        borderRadius: getWidth(10),
        borderColor: "#802115",
        borderWidth: getWidth(2)

    }



}
)