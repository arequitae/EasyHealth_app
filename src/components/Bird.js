import Matter from 'matter-js'
import React from 'react'
import {Image } from 'react-native'
import Images from './pic/Images'


const Bird = props =>{
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2


    return(
        <Image style={{
            position:'absolute',
            left:xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}
        resizeMode="contain"
        source={Images.bird1}
        />
    )
}

export default (world, pos, size)=>{
   const initialBird = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {label:'Bird'}
   )
   Matter.World.add(world, initialBird)

   return{
       body: initialBird,
       pos,
       renderer: <Bird/>
   }
}