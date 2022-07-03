import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import Task from "./Task";
import { KeyboardAvoidingView } from "react-native";
import { getHeight, getWidth } from "../utils/Adapter";
import ModalDropdown from 'react-native-modal-dropdown';
import CardView from "react-native-cardview-wayne";
import Swiper from 'react-native-swiper'

const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(52,152,219, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(52,152,219, ${opacity})`,
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
                <Text style={styles.textTitle}>Health Tips </Text>
            </View>

            <Swiper style={styles.wrapper} showsButtons={true}>
                <View>
                    <CardView style={styles.CardStyle}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                            <View>
                                <Text style={styles.textTitleCard}>How to Reduce a Fever Without Medication</Text>
                            </View>
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        style={{ margin: 5, height: 120, width: 200 }}
                                        source={require('../img/tip1.png')} />
                                </View>

                                <Text style={styles.textCard}>Fever can lead to dehydration which can make the sufferer feel worse. Avoid dehydration by drinking plenty of water or an oral rehydration solution like CeraLyte, Pedialyte.</Text>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View>
                    <CardView style={styles.CardStyle}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                            <View>
                                <Text style={styles.textTitleCard}>How to Clean Your Teeth Naturally</Text>
                            </View>
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        style={{ margin: 5, height: 120, width: 200 }}
                                        source={require('../img/tip2.jpg')} />
                                </View>

                                <Text style={styles.textCard}>Oil pulling is an Ayurvedic remedy in which you swish oil in your mouth to remove harmful germs and bacteria from your mouth. It also whitens teeth and freshens breath.</Text>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View>
                    <CardView style={styles.CardStyle}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                            <View>
                                <Text style={styles.textTitleCard}>Getting hpv Vaccine is a Must!</Text>
                            </View>
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        style={{ margin: 5, height: 120, width: 200 }}
                                        source={require('../img/tip3.png')} />
                                </View>
                                <Text style={styles.textCard}>The incidence rate of cervical cancer is only next to breast cancer in women. A large number of laboratory research data show that the immune response of HPV host plays a very important role in controlling HPV infection and related lesions.</Text>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View>
                    <CardView style={styles.CardStyle}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                            <View>
                                <Text style={styles.textTitleCard}>Wear N95 masks correctly </Text>
                            </View>
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        style={{ margin: 5, height: 120, width: 200 }}
                                        source={require('../img/tip4.png')} />
                                </View>
                                <Text style={styles.textCard}>1. Cup mask in hand and place it over your mouth.{"\n"}
                                    2. Place the mask in the palm of your hand so that the straps face the floor.{"\n"}
                                    3. Pull the bottom and top straps over your head.{"\n"}
                                    4. Mold the nose piece around the bridge of nose.{"\n"}
                                    5. Set your first 2 fingertips on either side of the metal nose clip at the top of your mask.{"\n"}
                                </Text>
                            </View>
                        </View>
                    </CardView>
                </View>
                
            </Swiper>






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
        borderColor: '#F28F37',
        borderWidth: getWidth(2)
    },
    addWrapper: {
        width: getWidth(40),
        height: getWidth(40),
        backgroundColor: "#fff",
        borderRadius: getWidth(40),
        justifyContent: "center",
        borderColor: '#F28F37',
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
        borderColor: '#F28F37',
        borderWidth: getWidth(2)

    },
    wrapper: {
        height: getHeight(390),

    },
    CardStyle:{
        marginHorizontal: 30,
        width: getWidth(310),
        height: getHeight(330),
    }



}
)