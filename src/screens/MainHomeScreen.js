/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, ImageBackground, StatusBar, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BarcodeScannerIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button, Badge, Card } from 'react-native-paper';
import profile from "../assets/images/guard-64.png"
import MainOrderViewScreen from '../OrderOptionsScreens/MainOrderViewScreen';
const THEME_COLOR = '#50E687';
import { useQuery } from '@apollo/client';
import { QUERY_DELIVERY_BOY_BY_ID } from '../GraphQlOperation/Query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlockScreen from './BlockScreen';

const MainHomeScreen = ({ navigation }) => {

    const [userId, setUserId] = useState()

    useEffect(() => {
        AsyncStorage.getItem('deliveryId').then(id => setUserId(id));
    }, []);

    const { data: deliveryBoyData, loading: deliveryBoyLoading } = useQuery(QUERY_DELIVERY_BOY_BY_ID, {
        variables: {
            "userId": `${userId}`
        },
        pollInterval: 1000
    })

    return (
        <>
            {
                deliveryBoyData && deliveryBoyData.getOneDelivery.status === 'block' ?
                    <BlockScreen /> :
                    <>
                        <StatusBar backgroundColor={THEME_COLOR} barStyle="white-content" />
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                                    <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>Orders</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ScannerAll')}>
                                        <BarcodeScannerIcon name="barcode-scan" size={50} style={{ color: '#fff' }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                                        <Image source={profile} style={{ width: 50, height: 50 }} />
                                    </TouchableOpacity>
                                </View>
                                {/* <View style={{
                        flexDirection: 'row',
                        borderColor: '#C6C6C6',
                        borderWidth: 1, borderRadius: 10,
                        marginHorizontal: 15, paddingLeft: 20, backgroundColor: '#E5E5E5', borderRadius: 20, marginVertical: 10
                    }}>
                        <Feather name="search" size={20} color="#20315" style={{marginTop: 13 }} />
                        <TextInput style={{flexDirection:"row", justifyContent:"flex-start", marginHorizontal:30}} placeholder="Search" />
                    </View>  */}

                            </View>
                            <View style={styles.footer}>
                                <MainOrderViewScreen />
                            </View>
                        </View>
                    </>
            }

        </>
    )
}
/* Rectangle 15 */


export default MainHomeScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        flex: 0.3,
        justifyContent: 'center',
        backgroundColor: '#50E687',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomEndRadius: 30,

    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        paddingVertical: 30,

    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        marginTop: 5,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 414,
        height: 1301,
        position: 'absolute',

    },
});