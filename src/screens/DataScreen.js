import React, { Component,useState } from "react";
import { View, Text, Button, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native';
import CardView from "react-native-cardview-wayne";
import { LineChart } from "react-native-chart-kit";

const data ={
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{data: [50, 47, 52, 60, 55, 54]}]
}

const chartConfig ={
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

const DataScreen = ({navigation}) =>{
   const [weight, setWeight] = useState(0);
   const [height, setHeight] = useState(0);
   
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 29 }}>
                    <View style={styles.profileInfos} row aCenter>
                        <Image style={styles.image} source={require('./1.jpg')} />
                        <View style={styles.nameSection}>
                            <Text style={styles.textWelcome}>Hello, Kylie</Text>
                        </View>
                    </View>
                    <CardView style={{
                        marginHorizontal: 8,
                        marginTop: 5
                    }}
                        cardElevation={4}
                        maxCardElevation={4}
                        radius={10}
                        backgroundColor={'#ffffff'}>
                        <View style={{ padding: 8, margin: 8 }}>
                            <View>
                                <Text style={styles.textTitle}>Goal:</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="Lost Weight"
                                ></TextInput>
                            </View>
                        </View>
                    </CardView>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <CardView style={{
                            marginHorizontal: 8,
                            marginTop: 3
                        }}
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={10}
                            backgroundColor={'#ffffff'}>
                            <View style={{
                                padding: 8,
                                margin: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View>
                                    <View>
                                        <Text style={styles.textTitle}>Weight:      </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="50"
                                            keyboardType="number-pad"
                                            onChangeText={(e)=>{setWeight(e)}}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>

                        <CardView style={{
                            marginHorizontal: 1,
                            marginTop: 3
                        }}
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={10}
                            backgroundColor={'#ffffff'}>
                            <View style={{
                                padding: 8,
                                margin: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View>
                                    <View> 
                                        <Text style={styles.textTitle}>Height:       </Text>
                                    </View>
                                    <View>
                                    <TextInput
                                            style={styles.textInputStyle}
                                            placeholder="170"
                                            keyboardType="number-pad"
                                            onChangeText={(e)=>{setHeight(e)}}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                        <CardView style={{
                            marginHorizontal: 5,
                            marginTop: 3
                        }}
                            cardElevation={4}
                            maxCardElevation={4}
                            radius={10}
                            backgroundColor={'#ffffff'}>
                            <View style={{
                                padding: 8,
                                margin: 8,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View>
                                    <View>
                                        <Text style={styles.textTitle}>BMI:         </Text>
                                    </View>
                                    <View>
                                    <TextInput
                                            style={styles.textInputStyle}
                                            editable={false}
                                            value= {String((Number(weight)/(Math.pow((Number(height)/100),2))).toFixed(2))}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                        </CardView>
                    </View>
                    <View style={{ padding: 8, margin: 8 }}>
                        <Text style={styles.textTitle}>Weight Trend</Text>
                        <LineChart
                            data={data}
                            width={370} // from react-native
                            height={200}
                            yAxisSuffix="kg"
                            yAxisInterval={2} // optional, defaults to 1
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


export default DataScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    profileInfos: {
        marginTop: 16,
        paddingHorizontal: 29,
        flexDirection: 'row',
        alignItems: 'center',

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderColor: "#dddddd",
        borderWidth: 1,
        backgroundColor: "#dcdcdc"
    },
    nameSection: {
        marginLeft: 40
    },
    textInputStyle: {
        fontSize: 20,
        color: "black"
    },
    textWelcome:{
        fontSize: 20,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "grey"
    },
    textTitle:{
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
        color: "grey"
    }
}
)