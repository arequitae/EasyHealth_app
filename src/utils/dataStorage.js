import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from "react-native";

async function saveObjLikeData(obj,key){
    try{
        let json=JSON.stringify(obj);
        AsyncStorage.setItem(key,json);
        //console.log(json);
    }catch(e){
        Alert.alert("Message didn't save successfully！")
    }

}

async function readOBjLikeData(key){
    try{ 
        let value = await AsyncStorage.getItem(key);
    
        return value;
       
    }catch(e){
        Alert.alert("Message didn't read successfully！")
    }
}

async function DeleteData(key){
    try{ 
        let value = await AsyncStorage.removeItem(key);
       
        return value;
       
    }catch(e){
        Alert.alert("Message didn't delete successfully！")
    }
}

export {readOBjLikeData,saveObjLikeData,DeleteData};