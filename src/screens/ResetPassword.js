import { View, Text ,TouchableOpacity,TextInput} from 'react-native'
import React,{useState,useRef} from 'react'
import { Button, Badge, Card,  } from 'react-native-paper';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEND_OTP } from '../GraphQlOperation/Query';
import { showMessage, hideMessage } from "react-native-flash-message";

import { MUTATION_RESET_PASSWORD_DELIVERY_BOY } from '../GraphQlOperation/Mutation';

export default function ResetPassword({ navigation, route }) {

  const contact = route.params;

   console.log(contact)

    const[getNew,setGetNew] =useState()
    const [error, setError] = useState(false);

   const[resetPasswordDeliveryboy,{data}]=useMutation(MUTATION_RESET_PASSWORD_DELIVERY_BOY,{
    onError(error) {
        setError(true)
      }
   })

   console.log(data)

  if(data){
    navigation.navigate("LoginScreennew")
  }else{
   
  }


  const handleClick =()=>{
    resetPasswordDeliveryboy({
        variables:{
            "resetPasswordInput": {
                "contact":`${contact}`,
                "password": `${getNew}`
              }  
        }
    })
  }


  return (
    <View>
        <View style={{marginTop:200,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         <Card style={{width:"90%"}}>
        <View style={{flexDirection:"row" ,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"#26de81",fontSize:15,margin:20}}>Reset Password</Text>
        </View>
        
              <View style={{borderWidth:2,borderColor:"#26de81",margin:10,borderRadius:10}}>
              <TextInput  placeholder='New Password...' style={{fontSize:17}}  onChangeText={(e)=>setGetNew(e)}/>
              </View>
              <TouchableOpacity onPress={()=>handleClick()}>
              <View style={{backgroundColor:"#26de81",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <Text style={{padding:10,color:"#fff",fontWeight:"bold"}}>Change Password</Text>    
              </View>
              </TouchableOpacity>
         </Card>
      </View>
    </View>
  )
}