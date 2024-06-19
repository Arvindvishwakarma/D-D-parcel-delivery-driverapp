/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, TextInput, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import { Checkbox } from "react-native-paper";
const THEME_COLOR = '#E5E5E5';
const SignUpFormScreen = ({ navigation }) => {
    const [checked, setChecked] = React.useState(false);

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Image
                        animation="bounceIn"
                        source={require('../assets/images/LoginPageimg.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
                    {/*  */}
                </View>
                <Animatable.View style={styles.footer}>
                    <Text style={styles.title}>
                        Signup
                    </Text>
                    <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <TextInput style={{ paddingLeft: 20 }} placeholder="Full Name" />
                        <Feather name="user" color="#50E687" size={20} style={{ marginTop: 15 }} />
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <TextInput style={{ paddingLeft: 20 }} placeholder="Mobile Number" />
                        <Feather name="phone-call" color="#50E687" size={20} style={{ marginTop: 15 }} />
                    </View>
                    <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginTop: 30, justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <TextInput style={{ paddingLeft: 20 }} placeholder="Email Address" />
                        <Feather name="mail" color="#50E687" size={20} style={{ marginTop: 15 }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>I agree to the Terms of Services and Privacy Policy</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <LinearGradient
                                colors={['#50E687', '#50E687']}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>
                                    Create Account
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
                <View style={{ backgroundColor: "#fff" }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpFormScreen')}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: '600' }}>Don't have an account?
                                <Text style={{ color: 'blue', fontSize: 15, fontWeight: '600' }}> Sign UP</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
/* Rectangle 15 */

export default SignUpFormScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5"
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5'
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo * 1.7,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: 'black',
        marginTop: 7,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    button2: {
        alignItems: 'center',
        marginTop: 10, marginBottom: 30
    },
    signIn: {
        width: 250,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    signIn2: {
        width: 200,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    textSign2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    image: {
        width: 414,
        height: 1301,
        position: 'absolute'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 6,
    },
});