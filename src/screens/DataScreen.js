import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Alert, TextInput } from 'react-native';
import CardView from "react-native-cardview-wayne";
import { getHeight, getWidth } from "../utils/Adapter";
import {  saveObjLikeData } from "../utils/dataStorage";
import { CheckCalendar } from "../basicComponent/Calendar";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { getToken } from "../utils/Storage";




const alertData = (...args) => {
    let historyList = args[0];
    let daySelected = args[1];
    
    if(historyList.includes(daySelected)){
        getToken()
        .then(
            (token)=>{
                let url=`http://${global.serverUrl}/bodydata/history`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':token
                    },
                    body:JSON.stringify({saveTime:daySelected} )    
                }).then((Response)=>Response.json())
                .then(v=>{        
                    if(v.data){
                        let bodyData=v.data;    
                        Alert.alert(
                            `${daySelected}`,
                            `Your weight is ${bodyData.weight}kg and height is ${bodyData.height}cm`
                        )
                    }
                })
            }
        )
    }
    else {
        Alert.alert(
            `${daySelected}`,
            `Your didn't save data!`
        )
    }
}



const DataScreen = ({ navigation }) => {
    
    const [bodyData,setBodyData]=useState({
        userName:"",
        weight:0,
        height:0,
        lastSleepTime:0,
        water:0,
        thighCir:0,
        calfCir:0
    });
    const [goal, setGoal] = useState("")
    const [history, setHistory] = useState([]);
    const changeText=(e,key)=>{
        let newBodyData={...bodyData}
        newBodyData[key]=e
        setBodyData(newBodyData);
    } 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {//当页面focus的时候重新获取数据
            readBodyData();//读取详细数据
            readRecordedList();//读取历史记录的日期
        });
      
          return unsubscribe;//销毁
    }, [navigation])
    const readRecordedList=()=>{
        getToken()
        .then(
            (token)=>{
                let url=`http://${global.serverUrl}/bodydata/timelist`
                fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':token
                    }     
                }).then((Response)=>Response.json())
                .then(v=>{        
                    if(v.data){
                        let timeList=v.data;    
                        setHistory(timeList);
                    }
                })
            }
        )
    }
    const saveBodyData=()=>{
        getToken()
        .then(
            (token)=>{
                let url=`http://${global.serverUrl}/bodydata/savelatest`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':token
                    },
                    body: JSON.stringify(bodyData)
                }).then(readRecordedList);

            }
        )
        
    }

    const readBodyData=()=>{
        getToken()
        .then(
            (token)=>{
                let url=`http://${global.serverUrl}/bodydata/latest`
                fetch(url, {
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
                        setBodyData(bodyData);
                    }
                })
            }
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: getHeight(29) }}>
                <View style={styles.profileInfos} row aCenter>
                    <Image style={styles.image} source={require('./1.jpg')} />
                    <View style={styles.nameSection}>
                        <Text style={styles.textWelcome}>Hello, {bodyData.userName}</Text>
                    </View>
                </View>
                {/* 目标 */}
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
                                    saveObjLikeData({ goal }, "body_data")
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
                    {/* 体重 */}
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
                                        value={"" + bodyData.weight}
                                        keyboardType="number-pad"
                                        onChangeText={e=>changeText(e,'weight')}
                                        onBlur={() => {saveBodyData();}}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    {/* 身高 */}
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
                                        value={"" + bodyData.height}
                                        onChangeText={e=>changeText(e,'height')}
                                        onBlur={() => {saveBodyData();}}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </CardView>
                    {/* BMI */}
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
                                        value={String((Number(bodyData.weight) / (Math.pow((Number(bodyData.height) / 100), 2))).toFixed(2))}
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
                            {/* 睡眠 */}
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
                                            <Text style={styles.textTitle}>Sleep Time:</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                placeholder="hours"
                                                keyboardType="number-pad"
                                                value={"" + bodyData.lastSleepTime}
                                                onChangeText={(e) => { changeText(e,'lastSleepTime')}}
                                                onBlur={() => {saveBodyData();}}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </CardView>
                            {/* 喝水 */}
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
                                            <Text style={styles.textTitle}>Water Drink:</Text>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                placeholder="ml"
                                                keyboardType="number-pad"
                                                value={"" + bodyData.water}
                                                onChangeText={(e) => { changeText(e,'water')}}
                                                onBlur={() => {saveBodyData();}}
                                            ></TextInput>
                                        </View>
                                    </View>
                                </View>
                            </CardView>
                        </View>
                        {/* 大腿 */}
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
                                        <Text style={styles.largecardtextTitle}>Thigh circumference:   </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="cm"
                                            keyboardType="number-pad"
                                            value={"" + bodyData.thighCir}
                                            onChangeText={(e) => { changeText(e,'thighCir')}}
                                            onBlur={() => {saveBodyData();}}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                        {/* 小腿 */}
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
                                        <Text style={styles.largecardtextTitle}>Calf Circumference:   </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="cm"
                                            keyboardType="number-pad"
                                            value={"" + bodyData.calfCir}
                                            onChangeText={(e) => { changeText(e,'calfCir')}}
                                            onBlur={() => {saveBodyData();}}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                    </CollapsibleView>
                </View>






                <View style={{ padding: 8, margin: 8 }}>
                    <Text style={styles.textTitle}>Body Calendar</Text>
                    {<CheckCalendar days={history ? history : []} callback={alertData.bind(null, history)} />}

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