import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Alert, TextInput } from 'react-native';
import CardView from "react-native-cardview-wayne";
import { getHeight, getWidth } from "../utils/Adapter";
import { formatNowDate } from "../utils/DateUtils";
import { readOBjLikeData, saveObjLikeData } from "../utils/dataStorage";
import { CheckCalendar } from "../basicComponent/Calendar";
import CollapsibleView from "@eliav2/react-native-collapsible-view";




const alertData = (...args) => {
    let map = args[0];
    let key = args[1];
    let arr = map.get(key);
    if (arr) {
        Alert.alert(
            `${key}`,
            `Your weight is ${arr[0]}kg and height is ${arr[1]}cm`
        )
    }
    else {
        Alert.alert(
            `${key}`,
            `Your didn't save data!`
        )
    }
}



const DataScreen = ({ navigation }) => {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [goal, setGoal] = useState("")
    const [history, setHistory] = useState(null);
    const updateHistory = (v) => {

        v = JSON.parse(v);
        let len = v.length;
        if (len >= 1 && v[len - 1][0] == formatNowDate('yyyy-MM-dd')) {
            v[len - 1][1] = Number(weight);
            v[len - 1][2] = Number(height)
        }
        else {
            // if(len==7)
            //     v.shift();
            v.push([formatNowDate('yyyy-MM-dd'), Number(weight), Number(height)])
        }
        saveObjLikeData(v, 'history')
            .then(readOBjLikeData.bind(null, 'history'))
            .then((v) => {
                let map = new Map();
                v = JSON.parse(v)
                for (let i of v) {
                    map.set(i[0], [i[1], i[2]]);
                }
                setHistory(map)
            }).catch((e) => { console.log(e) })
    }

    useEffect(() => {
        readOBjLikeData('body_data')
            .then((v) => {
                if (!v)
                    return;
                v = JSON.parse(v)
                if (v.weight)
                    setWeight(v.weight);
                if (v.height)
                    setHeight(v.height);
                if (v.goal)
                    setGoal(v.goal)
            })
        readOBjLikeData('history').then((v) => {
            if (!v)
                return;
            let map = new Map();
            v = JSON.parse(v)
            for (let i of v) {
                map.set(i[0], [i[1], i[2]]);
            }
            setHistory(map)
        }).catch((e) => { console.log(e) })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: getHeight(29) }}>
                <View style={styles.profileInfos} row aCenter>
                    <Image style={styles.image} source={require('./1.jpg')} />
                    <View style={styles.nameSection}>
                        <Text style={styles.textWelcome}>Hello, Kylie</Text>
                    </View>
                </View>
                <CardView style={{
                    marginHorizontal: 8,
                    marginTop: 5,
                    // width:getWidth(331)
                }}
                    cardElevation={4}
                    maxCardElevation={4}
                    radius={10}
                    backgroundColor={'#ffffff'}>
                    <View style={{ padding: getHeight(8), margin: getHeight(8) }}>
                        <View>
                            <Text style={styles.textTitle}>Goal:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Try something new ~~"
                                value={goal}
                                onChangeText={(e) => { setGoal(e) }}
                                onBlur={() => {
                                    saveObjLikeData({ weight, height, goal }, "body_data")
                                }}
                            ></TextInput>
                        </View>
                    </View>
                </CardView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    paddingHorizontal: getWidth(5)

                }}>
                    <CardView style={styles.smallCard}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{
                            padding: getHeight(8), margin: getHeight(8),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View>
                                <View>
                                    <Text style={styles.textTitle}>Weight:</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        placeholder="kg"
                                        value={"" + weight}
                                        keyboardType="number-pad"
                                        onChangeText={(e) => { setWeight(e) }}
                                        onBlur={() => {
                                            saveObjLikeData({ weight, height, goal }, "body_data");
                                            readOBjLikeData('history')
                                                .then((v) => {
                                                    if (!v) {
                                                        saveObjLikeData([], 'history')
                                                            .then(updateHistory.bind(null, "[]"));
                                                        return;
                                                    }
                                                    updateHistory(v);
                                                })
                                        }}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </CardView>

                    <CardView style={styles.smallCard}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{
                            padding: getHeight(8), margin: getHeight(8),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View>
                                <View>
                                    <Text style={styles.textTitle}>Height:</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        placeholder="cm"
                                        keyboardType="number-pad"
                                        value={"" + height}
                                        onChangeText={(e) => { setHeight(e) }}
                                        onBlur={() => {
                                            saveObjLikeData({ weight, height, goal }, "body_data");
                                            readOBjLikeData('history')
                                                .then((v) => {
                                                    if (!v) {
                                                        saveObjLikeData([], 'history')
                                                            .then(updateHistory.bind(null, "[]"));
                                                        return;
                                                    }
                                                    updateHistory(v);
                                                })

                                        }}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    <CardView style={styles.smallCard}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{
                            padding: getHeight(8), margin: getHeight(8),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View>
                                <View>
                                    <Text style={styles.textTitle}>BMI:</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        editable={false}
                                        value={String((Number(weight) / (Math.pow((Number(height) / 100), 2))).toFixed(2))}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View>
                    <CollapsibleView style={styles.expand} title="More……">
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingHorizontal: getWidth(5)

                        }}>
                            <CardView style={styles.midCard}
                                cardElevation={4}
                                maxCardElevation={4}
                                radius={10}
                                backgroundColor={'#ffffff'}>
                                <View style={{
                                    padding: getHeight(8), margin: getHeight(8),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View>
                                        <View>
                                            <Text style={styles.textTitle}>Last Sleep Time:</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                placeholder="cm"
                                                keyboardType="number-pad"
                                                value={"" + height}
                                                onChangeText={(e) => { setHeight(e) }}
                                                onBlur={() => {
                                                    saveObjLikeData({ weight, height, goal }, "body_data");
                                                    readOBjLikeData('history')
                                                        .then((v) => {
                                                            if (!v) {
                                                                saveObjLikeData([], 'history')
                                                                    .then(updateHistory.bind(null, "[]"));
                                                                return;
                                                            }
                                                            updateHistory(v);
                                                        })

                                                }}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </CardView>
                            <CardView style={styles.midCard}
                                cardElevation={4}
                                maxCardElevation={4}
                                radius={10}
                                backgroundColor={'#ffffff'}>
                                <View style={{
                                    padding: getHeight(8), margin: getHeight(8),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View>
                                        <View>
                                            <Text style={styles.textTitle}>Water Drink(ml):</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                placeholder="cm"
                                                keyboardType="number-pad"
                                                value={"" + height}
                                                onChangeText={(e) => { setHeight(e) }}
                                                onBlur={() => {
                                                    saveObjLikeData({ weight, height, goal }, "body_data");
                                                    readOBjLikeData('history')
                                                        .then((v) => {
                                                            if (!v) {
                                                                saveObjLikeData([], 'history')
                                                                    .then(updateHistory.bind(null, "[]"));
                                                                return;
                                                            }
                                                            updateHistory(v);
                                                        })

                                                }}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </CardView>
                        </View>
                        <CardView style={styles.largeCard}
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={10}
                            backgroundColor={'#ffffff'}>
                            <View style={{
                                padding: getHeight(8), margin: getHeight(8),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.largecardtextTitle}>Thigh circumference(cm):   </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="cm"
                                            keyboardType="number-pad"
                                            value={"" + height}
                                            onChangeText={(e) => { setHeight(e) }}
                                            onBlur={() => {
                                                saveObjLikeData({ weight, height, goal }, "body_data");
                                                readOBjLikeData('history')
                                                    .then((v) => {
                                                        if (!v) {
                                                            saveObjLikeData([], 'history')
                                                                .then(updateHistory.bind(null, "[]"));
                                                            return;
                                                        }
                                                        updateHistory(v);
                                                    })

                                            }}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                        <CardView style={styles.largeCard}
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={10}
                            backgroundColor={'#ffffff'}>
                            <View style={{
                                padding: getHeight(8), margin: getHeight(8),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={styles.largecardtextTitle}>Calf Circumference(cm):   </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="cm"
                                            keyboardType="number-pad"
                                            value={"" + height}
                                            onChangeText={(e) => { setHeight(e) }}
                                            onBlur={() => {
                                                saveObjLikeData({ weight, height, goal }, "body_data");
                                                readOBjLikeData('history')
                                                    .then((v) => {
                                                        if (!v) {
                                                            saveObjLikeData([], 'history')
                                                                .then(updateHistory.bind(null, "[]"));
                                                            return;
                                                        }
                                                        updateHistory(v);
                                                    })

                                            }}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                    </CollapsibleView>
                </View>






                <View style={{ padding: 8, margin: 8 }}>
                    <Text style={styles.textTitle}>Body Calendar</Text>
                    {<CheckCalendar days={history ? Array.from(history.keys()) : []} callback={alertData.bind(null, history)} />}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default DataScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    profileInfos: {
        marginTop: getHeight(16),
        paddingHorizontal: getHeight(29),
        flexDirection: 'row',
        alignItems: 'center',

    },
    image: {
        width: getWidth(60),
        height: getWidth(60),
        borderRadius: getWidth(60),
        borderColor: "#dddddd",
        borderWidth: 1,
        backgroundColor: "#dcdcdc"
    },
    nameSection: {
        marginLeft: getWidth(40)
    },
    textInputStyle: {
        fontSize: 20,
        color: "black"
    },
    textWelcome: {
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "#F28F37"
    },
    textTitle: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "black"
    },
    largecardtextTitle: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "black",
        marginTop: getHeight(10)
    },

    textHolder: {
        width: getWidth(331),
        height: getHeight(200),
        borderRadius: getWidth(20),
        backgroundColor: 'rgba(253, 151, 15,0.8)',
        flexDirection: 'column',
        textAlign: "center",
        lineHeight: getHeight(200),
        fontSize: 32,
        color: 'lightgrey'
    },
    smallCard: {
        // marginHorizontal: 1,
        marginTop: 3,
        width: getWidth(112),
        height: getHeight(112)
    },
    midCard: {
        // marginHorizontal: 1,
        marginTop: 3,
        width: getWidth(170),
        height: getHeight(112)
    },
    largeCard: {
        // marginHorizontal: 1,
        marginTop: 3,
        width: getWidth(335),
        height: getHeight(100)
    },
    expand: {
        borderRadius: getWidth(20),
        color: "grey"
    }
}
)