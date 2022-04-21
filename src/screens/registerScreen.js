import React from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet, Button } from 'react-native';
import { Icon, Box, FormControl, Stack, Input, WarningOutlineIcon, NativeBaseProvider, Center } from 'native-base';
import { getHeight, getWidth } from '../utils/Adapter';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item1 = () => {
    return <Box alignItems="center" style={{ width: getWidth(300) }}>
        <Box w="100%" maxWidth="500px">
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Username</FormControl.Label>
                    <Input defaultValue="12345" placeholder="username" />
                </Stack>
            </FormControl>
        </Box>
    </Box>;
};


const Item2 = () => {
    return <Box alignItems="center" style={{ width: getWidth(300), marginTop: getHeight(10) }}>
        <Box w="100%" maxWidth="500px">
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" defaultValue="12345" placeholder="password" />
                    {/* <FormControl.HelperText>
                        Must be at least 6 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        At least 6 characters are required.
                    </FormControl.ErrorMessage> */}
                </Stack>
            </FormControl>
        </Box>
    </Box>;
};



const RegisterScreen = ({ navigation }) => {
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
                                <Item1 />
                            </Center>
                        </NativeBaseProvider>
                        <NativeBaseProvider>
                            <Center flex={1} px="3">
                                <Item2 />
                            </Center>
                        </NativeBaseProvider>
                        <View style={{ marginTop: getWidth(20), width: getWidth(200), marginLeft: getWidth(61) }}>
                            <Button title='REGISTER' color="#3498DB" onPress={() => navigation.navigate("Login")}></Button>
                        </View>
                    </View>

                </View>
            </View>





        </ScrollView>




    )
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