/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { View, Text, Image, ActivityIndicator, Button, StyleSheet, Linking ,TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useContext,useRef } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import profile from "../assets/images/guard-64.png"
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from '@apollo/client'
import { QUERY_DELIVERY_BOY_BY_ID } from '../GraphQlOperation/Query'
import { AuthContext } from '../context/AuthContext'

import RBSheet from "react-native-raw-bottom-sheet";
import { MUTATION_RESET_PASSWORD_DELIVERY_BOY } from '../GraphQlOperation/Mutation';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logOut } = useContext(AuthContext);
  const [userId, setUserId] = useState()
  useEffect(() => {
    AsyncStorage.getItem('deliveryId').then(id => setUserId(id));
  }, [])


  const { data, loading } = useQuery(QUERY_DELIVERY_BOY_BY_ID, {
    variables: {
      "userId": `${userId}`
    }

  })
 
   const[resetPassword] = useMutation(MUTATION_RESET_PASSWORD_DELIVERY_BOY)


  const[reset,setReset] =useState()

  const handleClick =()=>{
    resetPassword({
    variables:{
      "resetinput": {
        "userId": `${userId}`,
        "password": `${reset}`
      }
    }
    })
    logOut()
  }


  const refRBSheet = useRef();
  return (
    <>
      <View style={{ backgroundColor: "#50E687", paddingBottom: 30 }}>
        <Feather name="chevron-left" size={30} style={{ marginTop: 20, fontWeight: "500" }} color="#fff" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image source={profile} style={{ width: 70, height: 70, marginLeft: 20, borderColor: "#000", borderWidth: 2, borderRadius: 50 }} />
          <Text style={{ marginRight: 20, color: "#fff", marginTop: 20, fontSize: 20, fontWeight: "600" }}>{data && data.getOneDelivery.fName} {data && data.getOneDelivery.lName}  </Text>
        </View>
      </View>
      <View>

        <View style={{ backgroundColor: "#fff", shadowColor: "#000", elevation: 2, marginBottom: 20, paddingBottom: 40 }}>
          {
            loading ?
              <ActivityIndicator color="#000" size="large" /> :
              <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ marginLeft: 20, flexDirection: "row" }}>
                      <Feather name="phone" size={20} />
                      <Text style={{ marginLeft: 10, color: "#000" }}>{data && data.getOneDelivery.contact}</Text>
                    </View>
                    <View style={{ marginLeft: 20, flexDirection: "row", marginTop: 10 }}>
                      <Feather name="mail" size={20} />
                      <Text style={{ marginLeft: 10, color: "#000" }}>{data && data.getOneDelivery.email}</Text>
                    </View>
                  </View>
                  <View style={{ marginRight: 20, flexDirection: "row", }}>
                    <Text style={{ color: "#000", marginBottom: 20 }}>ID: {data && data.getOneDelivery.deliveryboyId}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
                  <Feather name="map-pin" size={20} />
                  <Text style={{ color: "#000", marginLeft: 10 }}>{data && data.getOneDelivery.address}</Text>
                </View>

                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                  <Text style={{ color: "#000", fontWeight: "500" }}>Bank Account Details</Text>
                </View>
                <View style={{ flexDirection: "column", }}>

                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={{ color: "#000", marginLeft: 20 }}>Bank Name : {data && data.getOneDelivery.bankName}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#000", marginLeft: 20 }}>IFSC code : {data && data.getOneDelivery.bankIFSC}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#000", marginLeft: 20 }}>Account No : {data && data.getOneDelivery.bankAccountNo}</Text>
                  </View>
                </View>
              </>
          }
        </View>
        <View style={{ marginHorizontal: 130, backgroundColor: '#000' }}>
          <Button title="Logout" color='#d35400' onPress={() => logOut()} />
        </View>

        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
       <View style={{flexDirection:"column",alignItems:"center",marginTop:20}}>
         <Text style={{color:"#000"}}>Reset Password</Text>
       </View>
       </TouchableOpacity>
       



      </View>
      <View style={styles.footer}>
        <Text>Developed by <Text onPress={() => Linking.openURL("https://softseekersinfotech.com/").catch(err => console.error("Couldn't load page", err))}>Softseekers Infotech Pvt. Ltd.</Text></Text>

      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
       
      >
     <View style={{flexDirection:"column"  ,alignItems:"center"}}>
    <View style={{width:"95%",}}>
  <TextInput placeholder='Enter New password' style={{marginTop:20}} onChangeText={(e)=>setReset(e)} />
  </View>
   <TouchableOpacity onPress={()=> handleClick()}>
    <View style={{width:"100%" ,flexDirection:"column" ,alignItems:"center",justifyContent:"center",marginTop:20,backgroundColor:"#27ae60",padding:10}}>
    <Text style={{color:"#fff"}} >Reset Password</Text>
    </View>
   </TouchableOpacity>
   
  
</View>


      </RBSheet>


    </>
  )
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  titleWrapper: {

  },
  inputWrapper: {

  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'center',
    alignItems: 'center'
  }
});

export default ProfileScreen