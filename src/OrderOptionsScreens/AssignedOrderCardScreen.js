/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { Badge, Card, TextInput } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'
import { useQuery, gql, useMutation } from '@apollo/client';
import { locationPermission, getCurrentLocation } from '../screens/HelperFunction';
import { QUERY_DELIVERY_BOY_BY_ID_ORDER } from '../GraphQlOperation/Query';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MUTATION_LOCATION_DELIVERY_BOY, MUTATION_DB_DEVICE_TOKEN, MUTATION_UPDATE_DB_TOTAL_KM } from '../GraphQlOperation/Mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'react-moment';
import moment from 'moment'
import { Picker } from '@react-native-picker/picker';


import DatePicker from 'react-native-date-picker';

const AssignedOrderCardScreen = () => {
    let count = 1
    const todayDate = new Date();

    const [deliveryBoyDeviceToken, setDeliveryBoyDeviceToken] = useState();
    const [foundValue, setFoundValue] = useState([]);

    const [deliveryBoyId, setDeliveryBoyId] = useState();
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    const [searchNameValue, setSearchNameValue] = useState('');
    const [searchDateValue, setSearchDateValue] = useState('');
    const [searchStatusValue, setSearchStatusValue] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('deliveryId').then(id => setDeliveryBoyId(id));
        AsyncStorage.getItem('deliveryBoyDeviceToken').then(id => setDeliveryBoyDeviceToken(id));
    }, []);

    const [addLocationDeliveryBoy, { data }] = useMutation(MUTATION_LOCATION_DELIVERY_BOY)

    const navigation = useNavigation();

    const { data: OrderById, loading } = useQuery(QUERY_DELIVERY_BOY_BY_ID_ORDER, {
        variables: {
            'deliveryBoyId': `${deliveryBoyId}`,
        },
        pollInterval: 300,
    });

    const [updatekms] = useMutation(MUTATION_UPDATE_DB_TOTAL_KM)

    const [updateDbDeviceToken] = useMutation(MUTATION_DB_DEVICE_TOKEN);

    useEffect(() => {
        if (OrderById) {
            setFoundValue(OrderById.getOrderByDeliveryBoyId);
            updateDbDeviceToken({
                variables: {
                    "deliveryBoyId": `${deliveryBoyId}`,
                    "deviceToken": `${deliveryBoyDeviceToken}`
                }
            });
        }
    }, [OrderById]);

    const [newCoordinate, setNewCoordinate] = useState({
        latitude: null,
        longitude: null
    })
    const [oldCoordinate, setOldCoordinate] = useState({
        latitude: null,
        longitude: null
    })

    const [km, setKm] = useState();
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getLiveLocation();
    //     }, 3000);
    //     return () => clearInterval(interval);
    // });

    // const getLiveLocation = async () => {
    //     const locPermissionDenied = await locationPermission();
    //     if (locPermissionDenied) {
    //         const { latitude, longitude, heading } = await getCurrentLocation();

    //         addLocationDeliveryBoy({
    //             variables: {
    //                 'locationDeliveryBoyInput': {
    //                     'deliveryBoyId': `${deliveryBoyId}`,
    //                     'latitude': `${latitude}`,
    //                     'longitude': `${longitude}`,
    //                     'heading': `${heading}`,
    //                 },
    //             },
    //         });

    //         setNewCoordinate({
    //             latitude: latitude,
    //             longitude: longitude
    //         })

    //         totalKms(newCoordinate)

    //         // console.log("latitude", latitude);
    //         // console.log("longitude", longitude);
    //         // console.log("heading", heading);
    //     }
    // };

    // function totalKms(newCoor) {
    //     if (oldCoordinate.latitude === null && oldCoordinate.longitude === null) {
    //         setKm(0);
    //         setOldCoordinate({
    //             latitude: newCoor.latitude,
    //             longitude: newCoor.longitude
    //         })
    //     }
    //     else {
    //         let kms = haversine(newCoor, oldCoordinate)
    //         setKm(prev => prev + kms)
    //         setOldCoordinate({
    //             latitude: newCoor.latitude,
    //             longitude: newCoor.longitude
    //         })
    //         updatekms({
    //             variables: {
    //                 "deliveryBoyId": `${deliveryBoyId}`,
    //                 "kms": `${km}`
    //             }
    //         })
    //     }
    // }

    // console.log("KM", ((km) / 1000).toFixed(2));



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const filterByOrderNo = (e) => {

        setSearchDateValue('');
        setSearchStatusValue('');

        const keyword = e;

        if (keyword !== '') {
            const results = OrderById.getOrderByDeliveryBoyId.filter((data) => {
                return data.orderNo.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundValue(results);
        }
        else {
            setFoundValue(OrderById.getOrderByDeliveryBoyId);
        }
        setSearchNameValue(keyword);
    };

    const filterByDate = (e) => {

        setSearchNameValue('');
        setSearchStatusValue('');

        const finalDate = e.toString().slice(0, 10);
        const keyword = finalDate;
        if (keyword !== '') {
            const results = OrderById.getOrderByDeliveryBoyId.filter((data) => {
                return data.createDateTime.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundValue(results);
        }
        else {
            setFoundValue(OrderById.getOrderByDeliveryBoyId);
        }
        setSearchDateValue(keyword);
    };

    const filterByOrderStatus = (e) => {

        setSearchNameValue('');
        setSearchDateValue('');

        const keyword = e;

        if (keyword !== '') {
            const results = OrderById.getOrderByDeliveryBoyId.filter((data) => {
                return data.delieveryBoyStatus.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundValue(results);
        }
        else {
            setFoundValue(OrderById.getOrderByDeliveryBoyId);
        }
        setSearchStatusValue(keyword);
    };


    // Filter By Date
    const filterByDateText = (e) => {
        const finalDate = moment(e)
        const keyword = finalDate.format('YYYY-MM-DD');

        console.log(e)

        if (keyword !== '') {
            const results = OrderById.getOrderByDeliveryBoyId.filter((data) => {
                const dateMom = moment(data.createDateTime);
                const dateMomFormat = dateMom.format('YYYY-MM-DD')
                return dateMomFormat.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundValue(results);
        }
        else {
            setFoundValue(OrderById.getOrderByDeliveryBoyId);
        }
        // setSearchDateText(keyword);
    };

    return (
        <>
            {/* <View style={{ borderColor: '#50E687', borderWidth: 1, borderBottomWidth: 1, color: '#fff', marginTop: 10, fontSize: 12 }}>
                <Picker selectedValue={searchDateValue} onValueChange={(itemValue) => filterByDate(itemValue)}>
                    <Picker.Item label="All" value="" style={{ fontSize: 12 }} />
                    <Picker.Item label="Today" value={todayDate} style={{ fontSize: 12 }} />
                </Picker>
            </View> */}

            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                {
                    loading ?
                        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 200 }}>
                            <ActivityIndicator color="#000" size="large" />
                            <Text style={{ color: "#000" }}>Please wait data loading</Text>
                        </View>
                        :
                        <>
                            <ScrollView>
                                {/* <View style={{ marginTop: 15, justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, color: '#000' }}>Total Distance: {(foundValue && foundValue.reduce((total, currentValue) => total = total + parseInt(currentValue.totalOrderDistance), 0) / 1000).toFixed(2)} KM</Text>
                                </View> */}
                                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                                    <TextInput
                                        label="Order No"
                                        style={{ width: '30%', backgroundColor: '#fff', fontSize: 12, color: '#000' }}
                                        selectionColor="#26de81"
                                        underlineColor="#26de81"
                                        outlineColor="#26de81"
                                        activeOutlineColor="#26de81"
                                        activeUnderlineColor="#26de81"
                                        value={searchNameValue}
                                        onChangeText={value => filterByOrderNo(value)}
                                        mode="outlined"
                                        placeholderTextColor="#000"
                                    />

                                    <TouchableOpacity onPress={() => setOpenStart(true)}>
                                        {
                                            todayDate.getDate() === dateStart.getDate() ?
                                                <Text style={{ color: 'black', backgroundColor: '#ecf0f1', padding: 15, fontSize: 12, marginTop: 10 }}>Date</Text> :
                                                <Text style={{ color: 'black', backgroundColor: '#ecf0f1', padding: 15, fontSize: 12, marginTop: 10 }}><Moment element={Text} style={{ fontWeight: 'normal', fontSize: 12 }} format={'DD/MM/YYYY'}>{dateStart}</Moment></Text>
                                        }
                                    </TouchableOpacity>
                                    <DatePicker
                                        modal
                                        open={openStart}
                                        date={dateStart}
                                        onConfirm={(date) => { setOpenStart(false); setDateStart(date); filterByDateText(date) }}
                                        onCancel={() => { setOpenStart(false) }}
                                        style={{ color: '#000' }}
                                    />

                                    <View style={{ borderColor: '#50E687', borderWidth: 1, borderBottomWidth: 1, color: '#fff', marginTop: 10, fontSize: 12, width: '30%' }}>
                                        <Picker selectedValue={searchStatusValue} onValueChange={(itemValue) => filterByOrderStatus(itemValue)}>
                                            <Picker.Item label="All" value="" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Waiting for pickup" value="pending" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Picked" value="pickup" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Drop At Origin Hub" value="dropatoriginhub" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Picked From Origin Hub" value="pickedfromoriginhub" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Drop To Destination Hub" value="droptodestinationhub" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Picked From Destination Hub" value="pickedfromdestinationhub" style={{ fontSize: 12, color: '#000' }} />
                                            <Picker.Item label="Delivered" value="drop" style={{ fontSize: 12, color: '#000' }} />
                                        </Picker>
                                    </View>
                                </View>
                                {/* <View style={{ marginTop: 20, marginHorizontal: 50 }}>
                                    <Button title="Get Optimized Route" color="#2ecc71" onPress={() => navigation.navigate('OptimizedOrder', newCoordinate)} />
                                </View> */}
                                {foundValue && foundValue.map(getOrder => {
                                    return (
                                        <Card style={{ borderRadius: 5, width: '100%', elevation: 8, marginTop: 20, marginBottom: 15, borderColor: '#b2bec3', borderWidth: 1, paddingBottom: 30 }} onPress={() => navigation.navigate('OrderdetailScreen', ({ orderId: getOrder.id, pickupLatitude: getOrder.pickupLatitude, pickupLongitude: getOrder.pickupLongitude, dropLatitude: getOrder.descLatitude, dropLongitude: getOrder.descLongitude }))}>
                                            <View style={{ flexDirection: 'column', marginBottom: 10, marginTop: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                                                    <Text style={{ marginLeft: 10, fontSize: 15, color: '#000', fontWeight: "500" }}>{capitalizeFirstLetter(getOrder.OtherOrderType)}</Text>
                                                    {
                                                        getOrder.razorpayPaymentId === null ?
                                                            <Text style={{ marginLeft: 20, fontSize: 15, color: 'red', fontWeight: '500' }}>{capitalizeFirstLetter("Cash On Delivery")}</Text>
                                                            :
                                                            <Text></Text>
                                                    }
                                                </View>
                                                <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Order Id : <Text style={{ fontWeight: 'normal' }}>{getOrder.orderNo}</Text></Text>
                                                {
                                                    getOrder.delieveryBoyStatus === 'pending' ?
                                                        <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#f1c40f' }}>Waiting for pickup</Text></Text>
                                                        :
                                                        getOrder.delieveryBoyStatus === 'pickup' ?
                                                            <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#6c5ce7' }}>Picked</Text></Text>
                                                            :
                                                            getOrder.delieveryBoyStatus === 'dropatoriginhub' ?
                                                                <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#1abc9c' }}>Drop At Origin Hub</Text></Text>
                                                                :
                                                                getOrder.delieveryBoyStatus === 'pickedfromoriginhub' ?
                                                                    <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#3498db' }}>Picked From Origin Hub</Text></Text>
                                                                    :
                                                                    getOrder.delieveryBoyStatus === 'droptodestinationhub' ?
                                                                        <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#fd79a8' }}>Drop To Destination Hub</Text></Text>
                                                                        :
                                                                        getOrder.delieveryBoyStatus === 'pickedfromdestinationhub' ?
                                                                            <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#9b59b6' }}>Picked From Destination Hub</Text></Text>
                                                                            :
                                                                            getOrder.delieveryBoyStatus === 'cancel' ?
                                                                                <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: 'red' }}>Cancelled</Text></Text>
                                                                                :
                                                                                getOrder.delieveryBoyStatus === 'drop' ?
                                                                                    <Text style={{ marginLeft: 20, fontSize: 12, color: '#000', fontWeight: 'bold' }}>Status: <Text style={{ marginLeft: 20, fontSize: 12, color: '#2ecc71' }}>Delivered</Text></Text>
                                                                                    :
                                                                                    <Text>Error in fetching...</Text>
                                                }
                                                {/* <Text style={{ marginLeft: 20, fontSize: 12, color: "#000", fontWeight: 'bold' }}>Distance : <Text style={{ fontWeight: 'normal' }}>{(parseInt(getOrder.totalOrderDistance) / 1000).toFixed(2)} KM</Text></Text> */}
                                                {
                                                    getOrder.razorpayPaymentId === null ?
                                                        <Text style={{ marginLeft: 20, fontSize: 12, color: "#000", fontWeight: 'bold' }}>COD Price: <Text style={{ fontWeight: 'normal' }}>₹ {(parseInt(getOrder.bookingAmount)).toFixed(2)}</Text></Text>
                                                        :
                                                        <Text></Text>
                                                }
                                                <Text style={{ marginLeft: 20, fontSize: 12, color: "#000", fontWeight: 'bold' }}>Weight: <Text style={{ fontWeight: 'normal' }}>{getOrder.parcelWeight} KG</Text></Text>
                                                <Text style={{ marginLeft: 20, fontSize: 12, color: "#000", fontWeight: 'bold' }}>Date/Time: <Text style={{ fontWeight: 'normal' }}><Moment element={Text} style={{ marginLeft: 20, fontSize: 12, color: "#000" }} format="DD/MM/YYYY, hh:mm a">{getOrder.createDateTime}</Moment></Text></Text>
                                                {
                                                    getOrder.whetherCollected === 'Yes' ?
                                                        <View style={{ backgroundColor: '#3498db', padding: 10, marginTop: 10 }}>
                                                            <Text style={{ marginLeft: 20, fontSize: 12, color: "#fff", fontWeight: 'bold' }}>Parcel value to be collected: <Text style={{ fontWeight: 'normal' }}>Rs. {getOrder.parcelValue}</Text></Text>
                                                        </View> :
                                                        <Text></Text>
                                                }
                                                {
                                                    getOrder.payableBy === 'Payable by Sender' ?
                                                        <View style={{ backgroundColor: '#f39c12', padding: 10, marginTop: 10 }}>
                                                            <Text style={{ marginLeft: 20, fontSize: 12, color: "#fff", fontWeight: 'bold' }}>Payable By Sender</Text>
                                                        </View> :
                                                        getOrder.payableBy === 'Payable by Receiver' ?
                                                            <View style={{ backgroundColor: '#f39c12', padding: 10, marginTop: 10 }}>
                                                                <Text style={{ marginLeft: 20, fontSize: 12, color: "#fff", fontWeight: 'bold' }}>Payable by Receiver</Text>
                                                            </View> :
                                                            <Text></Text>
                                                }
                                            </View>

                                            <View style={{ height: 1, backgroundColor: "#26de81" }}></View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                <View style={{ flexDirection: "column" }}>
                                                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                                        <Text style={{ marginTop: 10, fontWeight: "500", color: "#26de81" }}>Pick up</Text>
                                                        {
                                                            getOrder.OtherOrderType === 'schedule' ?
                                                                <Moment element={Text} style={{ fontSize: 10, marginTop: 13, marginLeft: 10, color: "#000" }} format="DD/MM/YYYY, hh:mm a">{getOrder.ScheduleDateTime}</Moment> : <Text></Text>
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <FontAwesome name="user" style={{ marginLeft: 10, marginTop: 4 }} />
                                                        <Text style={{ marginLeft: 5, width: 100, color: "#000", fontWeight: "500", fontSize: 12 }}>{getOrder.senderName} </Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Entypo name='location' style={{ marginLeft: 9 }} />
                                                        <Text style={{ width: 120, marginLeft: 5, fontSize: 12, color: '#000' }}>{getOrder.pickupFullAddress}{","} {getOrder.pickupAddress}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ width: 1, height: 130, backgroundColor: "#26de81" }}></View>

                                                <View style={{ flexDirection: "column" }}>
                                                    <View style={{ flexDirection: "row", marginRight: 5, marginLeft: 10 }}>
                                                        <Text style={{ marginTop: 10, fontWeight: "500", color: "#26de81" }}>Delivered</Text>
                                                        <Text style={{ fontSize: 10, marginTop: 13, marginLeft: 10, color: "#000" }}>{ }</Text>
                                                    </View>

                                                    <View style={{ flexDirection: "row", marginRight: 5, marginLeft: 5 }}>
                                                        <FontAwesome name="user" style={{ marginLeft: 5, marginTop: 4 }} />
                                                        <Text style={{ width: 100, color: "#000", fontWeight: "500", marginLeft: 5, fontSize: 12 }}>{getOrder.receiverName} </Text>
                                                    </View>

                                                    <View style={{ flexDirection: "row", marginRight: 5, marginLeft: 5 }}>
                                                        <Entypo name='location' style={{ marginLeft: 4 }} />
                                                        <Text style={{ width: 120, fontSize: 12, marginBottom: 20, color: '#000' }}>{getOrder.deliveryFullAddress}{","} {getOrder.deliveryAddress}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {/* <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>
                                     <TouchableOpacity onPress={() => handleClick(getOrder.id)} >
                                         <View style={{ width: 120, height: 40, backgroundColor: "#26de81", marginRight: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 20 }}>
                                             <Text style={{ fontWeight: "500", color: "#fff" }} >Start Now</Text>
                                         </View>
                                     </TouchableOpacity>
                                 </View> */}

                                            <View style={{ padding: 12, backgroundColor: "#26de81" }}>
                                                <Text style={{ color: "#fff", fontWeight: "bold" }}> <FontAwesome name="rupee" style={{ marginRight: 10 }} size={13} /> {getOrder.bookingAmount}</Text>
                                            </View>
                                        </Card>
                                    )
                                })
                                }
                            </ScrollView>
                        </>
                }
            </View>
        </>
    )
}

export default AssignedOrderCardScreen 