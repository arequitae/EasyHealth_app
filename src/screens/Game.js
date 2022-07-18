
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Root, Popup } from 'popup-ui'
import entities from '../entities';
import Physics from '../physics';
import Images from '../components/pic/Images';
import { getToken } from "../utils/Storage";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const calorie = 100


export default function Game(props) {
    const [running, setRunning] = useState(false)
    const [gameEngine, setGameEngine] = useState(null)
    const [currentPoints, setCurrentPoints] = useState(0)
    const [chance, setChance] = useState(0)
    const [ifc, setIFC] = useState(false)

    const [currentScore, setCurrentScore] = useState(0)
    const [rank, setRank] = useState(0)
    const [maxScore, setMaxScore] = useState(0)
    let str=props.route.params.target;
    let low=Number.parseInt(str.substring(0,str.indexOf('-')))
    let high=Number.parseInt(str.substring(str.indexOf('-')+1))
    const rebornJudge=()=>{
        let url=`http://${global.serverUrl}/game/ifPlay?low=${low}&high=${high}`
        getToken()
            .then(token=>{
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization':token
                    }
                }).then((Response)=>Response.json())
                    .then(v=>{
                        if(v.data){
                            let ifReborn=v.data;
                            if (ifReborn = 'true'){
                                setIFC(true)
                                setChance(3)
                            }
                        }
                    })
            })

    }

    const saveData=()=>{
        let url=`http://${global.serverUrl}/game/save?score=${currentPoints}`
        getToken()
            .then(token=>{
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization':token
                    }
                }).then((Response)=>Response.json())

            })

    }



    const rankget=async function(){
        let url=`http://${global.serverUrl}/game/list`
        await getToken()
            .then(async token=>{
               await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization':token
                    }
                }).then((Response)=>Response.json())
                    .then(v=>{
                        if(v.data){
                            Popup.show({
                                type: 'Success',
                                title: 'Your Score is '+currentPoints,
                                button: true,
                                textBody: `The 1st score is ${v.data.maxScore}\n You rank is ${Number.parseInt(v.data.rank)+1}`,
                                buttonText: 'OK',
                                callback: () => Popup.hide()
                            })
                            setMaxScore(v.data.maxScore)
                            setCurrentScore(v.data.currentScore)
                            setRank(Number.parseInt(v.data.rank)+1)
                        }
                    })
            })

    }

    useEffect(() => {
        setRunning(false)
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <Root>
                <Image source={Images.background} style={{ position: 'absolute', top: 0, buttom: 0, left: 0, right: 0, width: windowWidth, height: windowHeight }} resizeMode="stretch" />
                <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
                <GameEngine
                    ref={(ref) => { setGameEngine(ref) }}
                    systems={[Physics]}
                    entities={entities()}
                    running={running}
                    onEvent={(e) => {
                        switch (e.type) {
                            case 'game_over!':
                                setRunning(false)
                                gameEngine.stop()
                                saveData()
                                break;
                            case 'new':
                                setCurrentPoints(currentPoints + 1)
                                break;
                        }
                    }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}

                >
                    <StatusBar style="auto" hidden={true} />

                </GameEngine>
                {!running ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10 }}
                                          onPress={() => {
                                              setCurrentPoints(0)
                                              setRunning(true)
                                              gameEngine.swap(entities())
                                              rebornJudge()
                                          }}>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 30 }}>
                                NEW GAME
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10, marginTop: 20 }}
                                          onPress={() => {
                                              if(chance>0)
                                              {
                                                  setChance(chance-1)
                                                  setRunning(true)
                                                  gameEngine.swap(entities())
                                              }else if (chance<=0 && ifc==true){
                                                  Popup.show({
                                                      type: 'Warning',
                                                      title: 'Fail to Reburn',
                                                      button: true,
                                                      textBody: 'You have no chance to reborn.',
                                                      buttonText: 'OK',
                                                      callback: () => Popup.hide()
                                                  })
                                              }else if (ifc==false){
                                                  Popup.show({
                                                      type: 'Warning',
                                                      title: 'Fail to Reburn',
                                                      button: true,
                                                      textBody: 'Calorie intake today fails to meet the target. Please restart the game.',
                                                      buttonText: 'OK',
                                                      callback: () => Popup.hide()
                                                  })
                                              }
                                          }}>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 30 }}>
                                REBORN
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10, marginTop: 20}}
                                          onPress={() => {
                                              rankget();

                                          }}>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 30 }}>
                                RANKING
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10, marginTop: 20, marginBottom: 100  }}
                                          onPress={() => {
                                              props.navigation.goBack();
                                          }}>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 30 }}>
                                EXIT
                            </Text>
                        </TouchableOpacity>
                    </View> : null}
            </Root>
        </View>
    );
}


