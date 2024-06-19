/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, ActivityIndicator, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { locationPermission, getCurrentLocation } from '../screens/HelperFunction';
import { useQuery, gql, useMutation } from '@apollo/client';
import Imgpath from '../assets/images/bike.png';
import MapViewDirections from 'react-native-maps-directions';
import { QUERY_GET_ORDER_BY_ID } from '../GraphQlOperation/Query';
import { MUTATION_UPDATE_GEOLOCATION, MUTATION_WEIGHT_VERIFICATION } from '../GraphQlOperation/Mutation';
import { ScrollView } from 'react-native-gesture-handler';


// const GOOGLE_MAPS_APIKEY = 'AIzaSyBPseAlfoPiBoKykZghBAbXpDPxPamjmTwAIzaSyBPseAlfoPiBoKykZghBAbXpDPxPamjmTw';

export default function OrderdetailScreen({ route }) {

  const { orderId, pickupLatitude, pickupLongitude, dropLatitude, dropLongitude } = route.params;

  const { data, loading } = useQuery(QUERY_GET_ORDER_BY_ID, {
    variables: {
      'orderId': `${orderId}`,
    },
    pollInterval: 300
  });

 const[createWeightVerification]= useMutation(MUTATION_WEIGHT_VERIFICATION,{
  refetchQueries:[
    QUERY_GET_ORDER_BY_ID,
    "getOneOrder"
  ]
 })

  const navigation = useNavigation();

  const markerRef = useRef();




  const [state, setState] = useState({
    curLocs: {
      latitude: 19.0760,
      longitude: 72.8777,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },


    destinationCords: {
      latitude: parseFloat(pickupLatitude),
      longitude: parseFloat(pickupLongitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },

    deliveryDestinationCords: {
      latitude: parseFloat(dropLatitude),
      longitude: parseFloat(dropLongitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },

    coordinater: new AnimatedRegion({
      latitude: 23.8253,
      longitude: 78.7521,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,

    }),
    heading: 0,
  });






  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  });






  const [updateGeolocationOrder] = useMutation(MUTATION_UPDATE_GEOLOCATION);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {

      const { latitude, longitude, heading } = await getCurrentLocation();

      console.log('latitude:', latitude);
      console.log('longitude:', longitude);
      console.log('heading:', heading);

      updateGeolocationOrder({
        variables: {
          'updateGeolocationOrderInput': {
            'OrderId': `${orderId}`,
            'latitude': `${latitude}`,
            'longitude': `${longitude}`,
            'heading': `${heading}`,
          },
        },
      });

      animate(latitude, longitude);

      setState((prevState) => ({
        ...prevState,
        heading: heading,
        curLocs: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        coordinater: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }),
      }
      ));
    }
  };


  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000);
      }
    } else {
      coordinater.timing(newCoordinate).start();
    }
  };

  const mapRef = useRef()
  const { curLocs, destinationCords, heading, coordinater, deliveryDestinationCords } = state

  const fetchValue = (data) => {
    setState({
      destinationCords: {
        latitude: data.DestinationCords.latitude,
        longitude: data.DestinationCords.longitude,
      },
    });
  };


  console.log(data)

  const handleYes =(id)=>{
    createWeightVerification({
     variables:{
      "weightInput": {
        "orderId": `${id}`,
        "weightVerifiction": "Yes"
      }
     } 
    })
  }
 
  const handleNo =(id)=>{
    createWeightVerification({
      variables:{
       "weightInput": {
         "orderId": `${id}`,
         "weightVerifiction": "No"
       }
      } 
     })
  }



  return (
    <ScrollView>
      {
        loading ?
          <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 200 }}>
            <ActivityIndicator color='#000' size="large" />
            <Text style={{ marginTop: 5, color:'#000' }}>Please wait data is loading.....</Text>
          </View>
          :
          <View style={{ flexDirection: 'column' }}>
            <View style={{ height: 120, backgroundColor: "#26de81" }}>
              <Feather name="chevron-left" size={30} style={{ marginTop: 40, fontWeight: "500" }} color="#fff" onPress={() => navigation.goBack()} />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginTop: 10, fontSize: 15, fontWeight: 'bold', color: "#fff", marginHorizontal: 15 }}>Order No: {data && data.getOneOrder.orderNo}</Text>
              </View>

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ marginLeft: 10, marginTop: 20, color: "#000", fontWeight: "700", fontSize: 17 }}>Sender</Text>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Feather name="user" style={{ color: "#000" }} />
                  <Text style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>{data && data.getOneOrder.senderName}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <Feather name="phone" style={{ color: "#000" }} />
                  <Text style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>{data && data.getOneOrder.senderContact}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "column", marginRight: 12 }}>
                <Text style={{ marginLeft: 0, marginTop: 20, color: "#000", fontWeight: "700", fontSize: 17 }}>Receiver</Text>
                <View style={{ flexDirection: "row" }}>
                  <Feather name="user" style={{ color: "#000" }} />
                  <Text style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>{data && data.getOneOrder.receiverName}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Feather name="phone" style={{ color: "#000" }} />
                  <Text style={{ marginLeft: 5, fontSize: 12, color: "#000" }}>{data && data.getOneOrder.receiverContact}</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}>
              <Text style={{ fontSize: 12, color: "#000" }}>Order Type</Text>
              <Text style={{ fontSize: 12, marginLeft: 30, fontWeight: "500", color: "#000" }}>{data && data.getOneOrder.OrderType}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}>
              <Text style={{ fontSize: 12, color: "#000" }}>Weight</Text>
              <Text style={{ fontSize: 12, marginLeft: 60, fontWeight: "500", color: "#000" }}>{data && data.getOneOrder.parcelWeight}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text style={{ fontWeight: "800", color: '#000' }}>Pick Up</Text>
                <Text style={{ width: 190, color: '#000', fontSize: 12 }}>{data && data.getOneOrder.pickupFullAddress}{","} {data && data.getOneOrder.pickupAddress}</Text>
              </View>

              <View style={{ flexDirection: "column", marginRight: 10 }}>
                <Text style={{ fontWeight: "800", color: '#000' }}>Deliverd</Text>
                <Text style={{ width: 190, color: '#000', fontSize: 12 }}>{data && data.getOneOrder.deliveryFullAddress}{","} {data && data.getOneOrder.deliveryAddress}</Text>
              </View>

            </View>

            {

              data && data.getOneOrder.razorpayPaymentId === null ?
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, color: "#e74c3c", fontWeight: "800" }}>Cash on Delivery</Text>
                  <Text style={{ marginRight: 10, color: "#2980b9", fontWeight: "800" }}>Total Amount :- ₹ {data && data.getOneOrder.bookingAmount}</Text>
                </View>
                :
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                  <Text style={{ marginLeft: 10, color: "#2ecc71", fontWeight: "800" }}>Online Paid</Text>
                  <Text style={{ marginRight: 10, color: "#2980b9", fontWeight: "800" }}>Total Amount :- ₹ {data && data.getOneOrder.bookingAmount}</Text>
                </View>
            }

           {

               data && data.getOneOrder.weightVerifiction === "No" ?
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             
               <Text style={{color:"#c0392b"}}>Weight Verification Reject </Text>
              </View>
               :
               data && data.getOneOrder.weightVerifiction === "Yes" ?
               <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"#2ecc71"}}>Weight Verification  Confirm</Text>
              </View>
               :
               <>
               <View style={{flexDirection:"row",justifyContent:"center"}}>
               <Text style={{color:"#000",marginTop:10}}>Weight Verification</Text>
               </View>
              <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
               <TouchableOpacity onPress={()=>handleYes(data && data.getOneOrder.id)}>
               <View style={{backgroundColor:"#26de81",marginLeft:10,flexDirection:"row",justifyContent:"center",alignItems:"center",width:150}}>
                <Text style={{padding:10,fontWeight:"bold",color:"#fff"}}>Yes</Text>
               </View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={()=>handleNo(data && data.getOneOrder.id)}>
               <View  style={{backgroundColor:"#eb3b5a",marginRight:10,flexDirection:"row",justifyContent:"center",alignItems:"center",width:150}}>
               <Text style={{padding:10,fontWeight:"bold",color:"#fff"}}>No</Text>
                 </View>
                 </TouchableOpacity>
              </View>
              </>
           }

           


            {/* <View style={{ marginTop: 20 }}>
              {

                data && data.getOneOrder.status === "pending" ?
                  <MapView
                    ref={mapRef}
                    style={{ height: 300, marginHorizontal: 10 }}
                    initialRegion={state.curLocs} >
                    <MapViewDirections
                      origin={curLocs}


                      destination={destinationCords}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="#2980b9"
                      optimizeWaypoints={true}
                      onReady={result => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                          // edgePadding: { right: 30, bottom: 300, left: 30, top: 100 }
                        })
                      }} />
                    <Marker.Animated
                      ref={markerRef}
                      coordinate={curLocs}>
                      <Image
                        source={Imgpath}
                        style={{
                          width: 40, height: 40,
                          transform: [{ rotate: `${heading}deg` }]
                        }}
                        resizeMode="contain"
                      />
                    </Marker.Animated>
                  </MapView>
                  :
                  <MapView
                    ref={mapRef}
                    style={{ height: 300, marginHorizontal: 10 }}
                    initialRegion={state.curLocs} >
                    <MapViewDirections
                      origin={curLocs}
                      destination={deliveryDestinationCords}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="#2980b9"
                      optimizeWaypoints={true}
                      onReady={result => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                          // edgePadding: { right: 30, bottom: 300, left: 30, top: 100 }
                        })
                      }} />
                    <Marker.Animated
                      ref={markerRef}
                      coordinate={curLocs}>
                      <Image
                        source={Imgpath}
                        style={{
                          width: 40, height: 40,
                          transform: [{ rotate: `${heading}deg` }]
                        }}
                        resizeMode="contain"
                      />
                    </Marker.Animated>
                  </MapView>
              }
            </View> */}
            <View style={{ justifyContent: "center", marginBottom: 20 }}>
              <View style={{ justifyContent: 'center', marginHorizontal: 50 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Result', { orderId: data && data.getOneOrder.id })}>
                  <View style={{ marginTop: 20, backgroundColor: "#2ed573", width: '100%', alignItems: "center", height: 40, justifyContent: "center", color: "#fff", padding: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "500" }}>Click Here to Update Order Status</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {
                data && data.getOneOrder.barcodeNo === null ?
                  <View style={{ justifyContent: 'center', marginHorizontal: 50 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ScannerQR', { orderId: orderId })}>
                      <View style={{ marginTop: 20, backgroundColor: "#2ed573", width: '100%', alignItems: "center", height: 40, justifyContent: "center", color: "#fff", padding: 10 }}>
                        <Text style={{ color: "#fff", fontWeight: "500" }}>Assign Order</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ marginTop: 20, alignItems: "center", height: 40, justifyContent: "center", color: "#fff", padding: 10 }}>
                    <Text style={{ color: '#e74c3c', fontWeight: "500" }}>Order Already Assigned to Barcode</Text>
                  </View>
              }

              {/* <View style={{ marginTop: 20, marginRight: 20, backgroundColor: "#2ed573", width: 100, alignItems: "center", height: 40, justifyContent: "center", color: "#fff" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Generater', { orderId: data && data.getOneOrder.id })}>
            <Text style={{ color: "#fff", fontWeight: "500" }}>Generater QR</Text>
          </TouchableOpacity>
        </View> */}

            </View>
          </View>

      }
    </ScrollView>
  )
}