/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Card } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GET_ORDER_BY_ID, QUERY_ORDER_BY_BARCODE_NO } from '../GraphQlOperation/Query';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { MUTATION_PICKUP_STATUS, MUTATION_DROP_STATUS, MUTATION_DROP_AT_ORIGIN_HUB, MUTATION_PICKED_FROM_ORIGIN_HUB, MUTATION_DROP_TO_DESTINATION_HUB, MUTATION_PICKED_FROM_DESTINATION_HUB } from '../GraphQlOperation/Mutation';
import { showMessage } from "react-native-flash-message";


export default function ResultAll({ route }) {
    const { barcodeNo } = route.params;

    const [totalDistance, setTotalDistance] = useState();
    const [stop, setStop] = useState(false);
    const navigation = useNavigation();

    const { data, loading } = useQuery(QUERY_ORDER_BY_BARCODE_NO, {
        variables: {
            "barcodeNo": `${barcodeNo}`,
        },
        pollInterval: 300
    })

    console.log("data", data)

    const [scannerStatus] = useMutation(MUTATION_PICKUP_STATUS, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });
    const [scannerDropStatus] = useMutation(MUTATION_DROP_STATUS, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });

    const [dropAtOriginHub] = useMutation(MUTATION_DROP_AT_ORIGIN_HUB, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });

    const [pickedFromOriginHub] = useMutation(MUTATION_PICKED_FROM_ORIGIN_HUB, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });

    const [dropToDestinationHub] = useMutation(MUTATION_DROP_TO_DESTINATION_HUB, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });

    const [pickedFromDestinationHub] = useMutation(MUTATION_PICKED_FROM_DESTINATION_HUB, {
        refetchQueries: [
            QUERY_GET_ORDER_BY_ID
        ],
    });

    const handleClick = () => {
        scannerStatus({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Pick up Successfully",
            type: "success",
        });
    };

    const handleClickDrop = () => {
        scannerDropStatus({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Pick up Successfully",
            type: "success",
        });
    };

    const handleDropAtOriginHub = () => {
        dropAtOriginHub({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Drop At Origin Hub Successfully",
            type: "success",
        });
    };

    const handlePickedFromOriginHub = () => {
        pickedFromOriginHub({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Picked From Origin Hub Successfully",
            type: "success",
        });
    };

    const handleDropToDestinationHub = () => {
        dropToDestinationHub({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Drop To Destination Hub Successfully",
            type: "success",
        });
    };

    const handlePickedFromDestinationHub = () => {
        pickedFromDestinationHub({
            variables: {
                "orderId": `${data && data.getOrderByBarcodeNo.id}`
            }
        })
        // navigation.navigate('MainHomeScreen')
        showMessage({
            message: "Picked From Destination Hub Successfully",
            type: "success",
        });
    };

    if (data && stop === false) {

        if (data.getOrderByBarcodeNo === null) {
            alert('No data found for this barcode!!!');
            navigation.navigate('MainHomeScreen');
        }
        else {
            const toRadian = n => (n * Math.PI) / 180

            let lat2 = data && data.getOrderByBarcodeNo.pickupLatitude
            let lon2 = data && data.getOrderByBarcodeNo.pickupLongitude
            let lat1 = data && data.getOrderByBarcodeNo.descLatitude
            let lon1 = data && data.getOrderByBarcodeNo.descLongitude
            let R = 6371  // km
            let x1 = lat2 - lat1
            let dLat = toRadian(x1)
            let x2 = lon2 - lon1
            let dLon = toRadian(x2)
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            let d = R * c
            setTotalDistance(d);
            setStop(true)
        }

    }


    return (
        <View>
            <View style={{ backgroundColor: "#26de81", height: 70 }}>
                <Feather name="chevron-left" size={30} style={{ marginTop: 20, fontWeight: "500" }} color="#fff" onPress={() => navigation.goBack()} />
            </View>
            {
                loading ?
                    <ActivityIndicator color="#000" size="large" /> :
                    data && data.getOrderByBarcodeNo === null ?
                        <View>
                            <Text>No Data Found!!!!</Text>
                        </View> :
                        <Card style={{ borderRadius: 5, width: '100%', elevation: 8, marginTop: 20, marginBottom: 15, borderColor: "#b2bec3", borderWidth: 1 }} >
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                                        <Text style={{ color: "#000", fontWeight: "600", marginTop: 20 }}>Sender Detail</Text>
                                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                                            <Feather name="phone" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10 }}>{data && data.getOrderByBarcodeNo.senderName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <Feather name="phone" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10 }}>{data && data.getOrderByBarcodeNo.senderContact}</Text>
                                        </View>
                                        <Text style={{ marginTop: 20 }}>Pickup Address</Text>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <Feather name="map-pin" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10, width: 100 }}>{data && data.getOrderByBarcodeNo.pickupAddress}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "column", marginRight: 10 }}>
                                        <Text style={{ color: "#000", fontWeight: "600", marginTop: 20 }}>Receiver Detail</Text>
                                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                                            <Feather name="phone" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10 }}>{data && data.getOrderByBarcodeNo.receiverName}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <Feather name="phone" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10 }}>{data && data.getOrderByBarcodeNo.receiverContact}</Text>
                                        </View>
                                        <Text style={{ marginTop: 20 }}>Delivered Address</Text>
                                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                                            <Feather name="map-pin" size={15} style={{ marginTop: 2 }} />
                                            <Text style={{ marginLeft: 10, width: 100 }}>{data && data.getOrderByBarcodeNo.deliveryAddress}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "column", marginTop: 10, marginBottom: 20 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ marginLeft: 20 }}>Weight</Text>
                                        <Text style={{ marginLeft: 20, fontWeight: "500", color: "#000" }}>{data && data.getOrderByBarcodeNo.parcelWeight}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ marginLeft: 20 }}>Order Type</Text>
                                        <Text style={{ marginLeft: 20, fontWeight: "500", color: "#000" }}>{data && data.getOrderByBarcodeNo.OrderType}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ marginLeft: 20 }}>Distance</Text>
                                        <Text style={{ marginLeft: 20, fontWeight: "500", color: "#000" }}>{Math.round(totalDistance)} KM</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                                    {
                                        Math.round(totalDistance) > 3 ?

                                            //greater

                                            data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pending" ?
                                                <>
                                                    <TouchableOpacity onPress={() => handleClick()}>
                                                        <View style={{ width: 200, height: 50, backgroundColor: "#3498db", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                            <Text style={{ color: "#fff", fontSize: 15 }}>Pick Up </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </>
                                                :
                                                data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pickup" ?
                                                    <>
                                                        <TouchableOpacity onPress={() => handleDropAtOriginHub()}>
                                                            <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Drop At Origin Hub</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </> :
                                                    data && data.getOrderByBarcodeNo.delieveryBoyStatus === "dropatoriginhub" ?
                                                        <>
                                                            <TouchableOpacity onPress={() => handlePickedFromOriginHub()}>
                                                                <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                    <Text style={{ color: "#fff", fontSize: 15 }}>Picked From Origin Hub</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </>

                                                        :
                                                        data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pickedfromoriginhub" ?
                                                            <>
                                                                <TouchableOpacity onPress={() => handleDropToDestinationHub()}>
                                                                    <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                        <Text style={{ color: "#fff", fontSize: 15 }}>Drop To Destination Hub</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </>
                                                            :
                                                            data && data.getOrderByBarcodeNo.delieveryBoyStatus === "droptodestinationhub" ?
                                                                <>
                                                                    <TouchableOpacity onPress={() => handlePickedFromDestinationHub()}>
                                                                        <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                            <Text style={{ color: "#fff", fontSize: 15 }}>Picked From Destination Hub</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </>
                                                                :
                                                                data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pickedfromdestinationhub" ?
                                                                    <>
                                                                        <TouchableOpacity onPress={() => handleClickDrop()}>
                                                                            <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Order Delivered</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </>
                                                                    :
                                                                    data && data.getOrderByBarcodeNo.delieveryBoyStatus === "drop" ?
                                                                        <View style={{ width: 200, height: 50, backgroundColor: "#26de81", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                            <Text style={{ color: "#fff", fontSize: 15 }}>Completed</Text>
                                                                        </View>
                                                                        : <Text></Text>

                                            //greater end
                                            : Math.round(totalDistance) === 3 ?

                                                //equal
                                                data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pending" ?
                                                    <>
                                                        <TouchableOpacity onPress={() => handleClick()}>
                                                            <View style={{ width: 200, height: 50, backgroundColor: "#3498db", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Order Picked </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                    :
                                                    data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pickup" ?
                                                        <>
                                                            <TouchableOpacity onPress={() => handleClickDrop()}>
                                                                <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                    <Text style={{ color: "#fff", fontSize: 15 }}>Order Delivered</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </> :
                                                        data && data.getOrderByBarcodeNo.delieveryBoyStatus === "drop" ?
                                                            <View style={{ width: 200, height: 50, backgroundColor: "#26de81", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Completed</Text>
                                                            </View> : <Text></Text>
                                                //equal end
                                                :

                                                //less
                                                data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pending" ?
                                                    <>
                                                        <TouchableOpacity onPress={() => handleClick()}>
                                                            <View style={{ width: 200, height: 50, backgroundColor: "#3498db", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Pick Up </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </>
                                                    :
                                                    data && data.getOrderByBarcodeNo.delieveryBoyStatus === "pickup" ?
                                                        <>
                                                            <TouchableOpacity onPress={() => handleClickDrop()}>
                                                                <View style={{ width: 200, height: 50, backgroundColor: "#1abc9c", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                    <Text style={{ color: "#fff", fontSize: 15 }}>Drop</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </> :
                                                        data && data.getOrderByBarcodeNo.delieveryBoyStatus === "drop" ?
                                                            <View style={{ width: 200, height: 50, backgroundColor: "#26de81", marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 50 }}>
                                                                <Text style={{ color: "#fff", fontSize: 15 }}>Completed</Text>
                                                            </View>
                                                            //less end
                                                            :
                                                            <Text></Text>
                                    }

                                </View>
                            </View>
                        </Card>

            }
        </View>
    )
}