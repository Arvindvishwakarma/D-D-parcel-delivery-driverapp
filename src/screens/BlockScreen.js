/* eslint-disable prettier/prettier */
import { View, Image, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from '../context/AuthContext'

const BlockScreen = () => {
    const { logOut } = useContext(AuthContext);
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff' }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', color: '#000' }}>
                <FontAwesome name="exclamation-triangle" size={100} color="#e74c3c" />
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#e74c3c' }}>You are blocked by admin!!!</Text>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Please contact to the administration</Text>
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 150, backgroundColor: '#e74c3c' }}>
                <Button title="Logout" color='#e74c3c' onPress={() => logOut()} />
            </View>
        </View>
    )
}

export default BlockScreen