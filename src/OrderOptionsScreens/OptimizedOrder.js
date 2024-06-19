/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { locationPermission, getCurrentLocation } from '../screens/HelperFunction';
import { useQuery, gql, useMutation } from '@apollo/client';
import Imgpath from '../assets/images/bike.png';
import MapViewDirections from 'react-native-maps-directions';
import { QUERY_GET_ORDER_BY_ID, QUERY_PENDING_ORDER_BY_DB } from '../GraphQlOperation/Query';
import { MUTATION_UPDATE_GEOLOCATION } from '../GraphQlOperation/Mutation';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import haversine from 'haversine-distance'

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const init = { latitude: 37.771707, longitude: -122.4053769 };
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBPseAlfoPiBoKykZghBAbXpDPxPamjmTwAIzaSyBPseAlfoPiBoKykZghBAbXpDPxPamjmTw';

export default function OptimizedOrder({ route }) {

    const dbLocation = route.params

    const [deliveryBoyId, setDeliveryBoyId] = useState();

    const navigation = useNavigation();

    const { data: pendingData, loading: pendingLoading } = useQuery(QUERY_PENDING_ORDER_BY_DB, {
        variables: {
            "deliveryBoyId": `${deliveryBoyId}`
        }
    });

    useEffect(() => {
        AsyncStorage.getItem('deliveryId').then(id => setDeliveryBoyId(id));
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('deliveryId').then(id => setDeliveryBoyId(id));
    }, []);


    const location = []
    pendingData && pendingData.getPendingOrders.map(loc => {
        location.push({
            orderId: `${loc.id}`,
            orderNo: `${loc.orderNo}`,
            pickupAddress: `${loc.pickupFullAddress}`,
            pickupLatitude: `${loc.pickupLatitude}`,
            pickupLongitude: `${loc.pickupLongitude}`,
            distance: (haversine([loc.pickupLatitude, loc.pickupLongitude], [dbLocation.latitude, dbLocation.longitude]) / 1000).toFixed(2),
        })
    }
    )
    const sortLocation = location.sort(function (a, b) {
        return a.distance - b.distance;
    })
    var lastElement = sortLocation[sortLocation.length - 1];

    const sortMap = sortLocation.map(l => l.distance)
    console.log(sortMap)

    let wayPointArray = []

    sortLocation.map(data => {
        const container = {
            latitude: parseFloat(data.pickupLatitude),
            longitude: parseFloat(data.pickupLongitude)
        }
        wayPointArray.push(container);
        return container
    })

    console.log("wayPointArray", wayPointArray)

    console.log(dbLocation.latitude);
    console.log(dbLocation.longitude);
    return (
        <ScrollView>
            {
                pendingLoading ?
                    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 200 }}>
                        <ActivityIndicator color='#000' size="large" />
                        <Text style={{ marginTop: 5 }}>Please wait data is loading.....</Text>
                    </View> :
                    <>
                        <View>
                            <View style={{ height: 70, backgroundColor: "#26de81" }}>
                                <Feather name="chevron-left" size={30} style={{ marginTop: 20, marginLeft: 20, fontWeight: "500" }} color="#fff" onPress={() => navigation.goBack()} />
                            </View>
                        </View>
                        <View style={styles.container}>
                            {/* <MapView
                                style={styles.maps}

                                initialRegion={{
                                    latitude: dbLocation.latitude,
                                    longitude: dbLocation.longitude,
                                    latitudeDelta: 0.0622,
                                    longitudeDelta: 0.0121,
                                }}>
                                <MapViewDirections
                                    origin={
                                        {
                                            latitude: dbLocation.latitude,
                                            longitude: dbLocation.longitude,
                                        }
                                    }
                                    waypoints={
                                        wayPointArray
                                    }

                                    destination={
                                        {
                                            latitude: parseFloat(lastElement.pickupLatitude),
                                            longitude: parseFloat(lastElement.pickupLongitude),
                                        }
                                    }
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={4}
                                    strokeColor="#111111"
                                    optimizeWaypoints={false}
                                />
                                <Marker coordinate={{
                                    latitude: parseFloat(dbLocation.latitude),
                                    longitude: parseFloat(dbLocation.longitude),
                                }}
                                    pinColor={'green'}
                                    title={'Your Location'}
                                    description={"Delivery Boy Location"}
                                />
                                {
                                    sortLocation.map(dd => {
                                        return (
                                            <Marker coordinate={{
                                                latitude: parseFloat(dd.pickupLatitude),
                                                longitude: parseFloat(dd.pickupLongitude),
                                            }}
                                                title={"Order No:" + " " + dd.orderNo}
                                                description={"Distance:" + " " + dd.distance + " " + "KM"}
                                            />
                                        )
                                    })
                                }

                                <Marker coordinate={{
                                    latitude: parseFloat(lastElement.pickupLatitude),
                                    longitude: parseFloat(lastElement.pickupLongitude),
                                }}
                                    pinColor={'orange'}
                                    title={'Last Parcel'}
                                    description={"Longest Distance"}
                                />



                            </MapView> */}
                        </View>
                    </>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    maps: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
});