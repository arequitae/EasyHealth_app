import React,{useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native';
import { apiUrl } from '../utils/env';

const LoginScreen=()=>{
    const [name,setName]=useState("");
    const [pwd,setPwd]=useState("");

    const login=()=>{
        fetch(`http://${apiUrl}/login`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name":name,
                "password":pwd
            }),
        })
            .then(v=>v.json())
            .then(v=>{console.log(v)})
            .catch(e=>{console.log(e)});
    }
    return(
        <>
        <Text>用户名</Text>
            <TextInput onChangeText={(value)=>setName(value)}></TextInput>
        <Text>密码</Text>
            <TextInput onChangeText={(value)=>setPwd(value)}></TextInput>
        <Button onPress={login} title={"登录"}/>
        </>
    )
}

export default LoginScreen;