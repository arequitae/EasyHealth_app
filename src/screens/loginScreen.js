import React,{Component} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, Button, TouchableOpacity,Alert } from 'react-native';
import { Icon, Box, FormControl, Stack, Input, WarningOutlineIcon, NativeBaseProvider, Center } from 'native-base';
import { getHeight, getWidth } from '../utils/Adapter';
import storage from './../utils/Storage';







class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        name:"",
        password:""
     }

    loginCheck=()=>{
        let loginUrl=`http://${global.serverUrl}/login`;
       
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:this.state.name,
                password:this.state.password
            }),
        })
        .then(response=>response.json())
        .then(body=>{
            if(body.code!=200){
                return Promise.reject(body.msg)
            }
            let token=body.data;
            storage.save({
                key: 'loginState', 
                data: {
                  token
                },       
                expires: 1000 * 3600 * 24
              }); 

            this.props.navigation.navigate("Tabs")
        })
        .catch(
            e=>
            {Alert.alert("Error",e)}
        )
    
        
    }

    Item1 = () => {
        return <Box alignItems="center" style={{ width: getWidth(300) }}>
            <Box w="100%" maxWidth="500px">
                <FormControl isRequired>
                    <Stack mx="4">
                        <FormControl.Label>Username</FormControl.Label>
                        <Input placeholder="username" onChangeText={e=>this.setState({...this.state,name:e})}/>
                    </Stack>
                </FormControl>
            </Box>
        </Box>;
    };
    
    
    Item2 = () => {
        return <Box alignItems="center" style={{ width: getWidth(300), marginTop: getHeight(10) }}>
            <Box w="100%" maxWidth="500px">
                <FormControl isRequired>
                    <Stack mx="4">
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password"  placeholder="password" onChangeText={e=>this.setState({...this.state,password:e})} />
                    </Stack>
                </FormControl>
            </Box>
        </Box>;
    };
    render() { 
        return ( 
            <ScrollView
            style={{ flex: 1, backgroundColor: "#fff" }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('./login.jpeg')}
                style={{ height: Dimensions.get("window").height / 2.5, }}>
            </ImageBackground>
            <View style={styles.bottomView}>
                <View style={{ padding: 23 }}>
                    <Text style={{ color: "#F28F37", fontSize: 24 }}>  Welcome</Text>
                    <Text>    Don't have an account?
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                            <Text style={{ color: 'red', fontStyle: "italic", fontSize: 16,fontWeight:"bold" }}>{' '} Register Now!</Text>
                        </TouchableOpacity>
                    </Text>
                    <View>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <NativeBaseProvider>
                            <Center flex={1} px="3">
                                <this.Item1 />
                            </Center>
                        </NativeBaseProvider>
                        <NativeBaseProvider>
                            <Center flex={1} px="3">
                                <this.Item2 />
                            </Center>
                        </NativeBaseProvider>
                        <View style={{ marginTop: getWidth(20), width: getWidth(200), marginLeft: getWidth(61) }}>
                            <Button title='LOGIN' color="#3498DB" onPress={this.loginCheck}></Button>
                        </View>
                    </View>

                </View>
            </View>
            </ScrollView>      
         );
    }
}
 


export default LoginScreen;

const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: "#fff",
        bottom: 70,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60

    }

})