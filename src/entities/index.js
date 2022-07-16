import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";

import {Dimensions} from 'react-native';
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width





export default restart => {
    let engine = Matter.Engine.create({enableSleeping:false})

    let world = engine.world

    world.gravity.y = 0.3;

    const pipeSizePosA = getPipeSizePosPair(-200)
    const pipeSizePosB = getPipeSizePosPair(windowWidth)

    return{
        physics: {engine, world},
        Bird: Bird(world, {x:50, y:200},{height:40, width:40}),
        ObstacleTop1: Obstacle(world, 'ObstacleTop1',pipeSizePosA.pipeTop.pos,pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', pipeSizePosA.pipeBottom.pos,pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', pipeSizePosB.pipeTop.pos,pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', pipeSizePosB.pipeBottom.pos,pipeSizePosB.pipeBottom.size),

        Floor: Floor(world, {x:windowWidth/2, y:windowHeight},{height:100, width:windowWidth})

    }
}