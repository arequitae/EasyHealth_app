import React,{Component} from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, Button ,Alert} from 'react-native';
import { Icon, Box, FormControl, Stack, Input, WarningOutlineIcon, NativeBaseProvider, Center } from 'native-base';
import { getHeight, getWidth } from '../utils/Adapter';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { TouchableOpacity } from 'react-native-gesture-handler';


class RegisterScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        name:"",
        password:''
     }
    Item1 = () => {
        return <Box alignItems="center" style={{ width: getWidth(300) }}>
            <Box w="100%" maxWidth="500px">
                <FormControl isRequired>
                    <Stack mx="4">
                        <FormControl.Label>Username</FormControl.Label>
                        <Input  placeholder="username" onChangeText={e=>{this.setState({...this.state,name:e})}}/>
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
                        <Input type="password"  placeholder="password" onChangeText={e=>{this.setState({...this.state,password:e})}}/>
                        {/* <FormControl.HelperText>
                            Must be at least 6 characters.
                        </FormControl.HelperText>
                       */}
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            At least 6 characters are required.
                        </FormControl.ErrorMessage> 
                    </Stack>
                </FormControl>
            </Box>
        </Box>;
    };
    
   register=()=>{
    let loginUrl=`http://${global.serverUrl}/register`;
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
            this.props.navigation.navigate("Login")
        })
        .catch(
            e=>
            {Alert.alert("Error",e)}
        )

       
   }
    render() { 
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: "#fff" }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('./register.jpg')}
                    style={{ height: Dimensions.get("window").height / 2.5, }}>
                </ImageBackground>
                <View style={styles.bottomView}>
                    <View style={{ padding: 23 }}>
                        <Text style={{ color: "#F28F37", fontSize: 24 }}>  Welcome</Text>
                        <Text>    Please Enter Your Account Information
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
                                <Button title='REGISTER' color="#3498DB" onPress={this.register}></Button>
                            </View>
                        </View>
    
                    </View>
                </View>  
            </ScrollView>

        )
    }
}
 

export default RegisterScreen;

const styles = StyleSheet.create({
    bottomView: {
        flex: 1.5,
        backgroundColor: "#fff",
        bottom: 70,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60

    }

})