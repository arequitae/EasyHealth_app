
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Image, Dimensions, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Root, Popup } from 'popup-ui'
import entities from '../entities';
import Physics from '../physics';
import Images from '../components/pic/Images';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const calorie = 100

export default function Game(props) {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [chance, setChance] = useState(0)

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
            }}>
            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 30 }}>
              NEW GAME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 30, paddingVertical: 10, marginTop: 20 }}
            onPress={() => {
              // setCurrentPoints(2)
              if(calorie>10 && chance <=3)
              {
              setChance(chance+1)
              setRunning(true)
              gameEngine.swap(entities())
              }else if (calorie>10 && chance>3){
                Popup.show({
                  type: 'Warning',
                  title: 'Fail to Reburn',
                  button: true,
                  textBody: 'You have no chance to reborn.',
                  buttonText: 'OK',
                  callback: () => Popup.hide()
                })  
              }else if (calorie<=10){
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
              Popup.show({
                type: 'Success',
                title: 'Your Score is '+currentPoints,
                button: true,
                textBody: 'Your highest score is 10.'+'\n'+'The 1st score is 100.'+'\n'+'You rank is 6',
                buttonText: 'OK',
                callback: () => Popup.hide()
              })
              
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


