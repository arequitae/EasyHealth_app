import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import Images from './pic/Images'

const Floor = props =>{
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    
    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const imageBC = Math.ceil(widthBody/heightBody);

    return(
        <View style={{
            position:'absolute',
            left:xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            overflow: "hidden",
            flexDirection:'row'
        }}>
            {Array.apply(null, Array(imageBC)).map((el, idx) => {
                    return <Image style={{ width: heightBody, height: heightBody }} key={idx} source={Images.floor} resizeMode="stretch" />
                })}
            </View>
    )
}

export default (world, pos, size)=>{
   const initialFloor = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {
           label:'Floor',
           isStatic:true
    }
   )
   Matter.World.add(world, initialFloor)

   return{
       body: initialFloor,
       pos,
       renderer: <Floor/>
   }
}