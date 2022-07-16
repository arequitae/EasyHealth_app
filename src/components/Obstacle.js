import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import Images from './pic/Images'

const Obstacle = props =>{
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const ratio = 160/widthBody
    const pipeHeight = 33 * ratio
    const pipeIterations = Math.ceil(heightBody/pipeHeight)

    return(
        <View style={{
            position:'absolute',
            left:xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            overflow:'hidden',
            flexDirection:'column'
        }}>
        {Array.apply(null, Array(pipeIterations)).map((el, idx) => {
                return <Image style={{ width: widthBody, height: pipeHeight }} key={idx} source={Images.pipeCore} resizeMode="stretch" />
            })}
        </View>
    )
}

export default (world, label,pos, size)=>{
   const initialObstacle = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {
           label,
           isStatic:true
        }
   )
   Matter.World.add(world, initialObstacle)

   return{
       body: initialObstacle,
       pos,
       renderer: <Obstacle/>
   }
}