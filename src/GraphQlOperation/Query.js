/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'

export const QUERY_GET_ORDER = gql`
query Query {
  getAllOrder {
    id
    orderNo
    pickupAddress
    deliveryAddress
    pickupFullAddress
    deliveryFullAddress
    senderId
    senderName
    senderEmail
    senderContact
    receiverName
    receiverEmail
    receiverContact
    receiverCity
    receiverState
    receiverPincode
    OrderType
    quickDate
    OtherOrderType
    parcelWeight
    parcelWeightType
    weightVerifiction 
    totalAmount
    createDateTime
    ScheduleDateTime
    servicetype
    paymentMethod
    PickUpfullAddress
    RecieverfullAddress
    paymentStatus
    deliveryBoyId
    deliveryBoyName
    latitude
    longitude
    heading
    pickupLatitude
    pickupLongitude
    descLatitude
    descLongitude
    deliveryBoyContact
    deliveryBoyEmail
    status
    delieveryBoyStatus
    senderStatus
    razorpayPaymentId
    bookingAmount
    receiverStatus
  }
}
`

export const QUERY_GET_ORDER_BY_ID = gql`
query Query($orderId: ID) {
  getOneOrder(orderId: $orderId) {
    id
    orderNo
    pickupAddress
    deliveryAddress
    pickupFullAddress
    deliveryFullAddress
    senderId
    senderName
    senderEmail
    senderContact
    receiverName
    receiverEmail
    receiverContact
    receiverCity
    receiverState
    weightVerifiction
    otherOrderTypeDocument
    deliveryDate
    receiverPincode
    OrderType
    quickDate
    OtherOrderType
    parcelWeight
    parcelWeightType
    totalAmount
    createDateTime
    ScheduleDateTime
    servicetype
    paymentMethod
    PickUpfullAddress
    RecieverfullAddress
    paymentStatus
    deliveryBoyId
    deliveryBoyName
    deliveryboylatitude
    deliveryboylongitude
    heading
    pickupLatitude
    pickupLongitude
    descLatitude
    descLongitude
    deliveryBoyContact
    deliveryBoyEmail
    status
    delieveryBoyStatus
    senderStatus
    razorpayPaymentId
    bookingAmount
    pickupDateTime
    dropDateTime
    reciverDate
    receiverStatus
    totalOrderDistance
    weightInt
    barcodeNo
  }
}
`

export const QUERY_DELIVERY_BOY_BY_ID = gql`
query Query($userId: ID) {
  getOneDelivery(userId: $userId) {
    id
    deliveryboyId
    fName
    lName
    contact
    email
    userName
    password
    address
    city
    state
    pincode
    IdProvideImg
    userType
    latitude
    longitude
    heading
    createDateTime
    bankName
    bankIFSC
    bankAccountNo
    ProfileImg
    status
  }
}`

export const QUERY_DELIVERY_BOY_BY_ID_ORDER = gql`
query Query($deliveryBoyId: ID) {
  getOrderByDeliveryBoyId(deliveryBoyId: $deliveryBoyId) {
    id
    orderNo
    pickupAddress
    deliveryAddress
    pickupFullAddress
    deliveryFullAddress
    senderId
    senderName
    senderEmail
    senderContact
    receiverName
    receiverEmail
    receiverContact
    receiverCity
    receiverState
    otherOrderTypeDocument
    deliveryDate
    receiverPincode
    OrderType
    quickDate
    OtherOrderType
    parcelWeight
    parcelWeightType
    totalAmount
    createDateTime
    ScheduleDateTime
    servicetype
    paymentMethod
    weightVerifiction
    PickUpfullAddress
    RecieverfullAddress
    paymentStatus
    deliveryBoyId
    deliveryBoyName
    deliveryboylatitude
    deliveryboylongitude
    heading
    pickupLatitude
    pickupLongitude
    descLatitude
    descLongitude
    deliveryBoyContact
    deliveryBoyEmail
    status
    delieveryBoyStatus
    senderStatus
    razorpayPaymentId
    bookingAmount
    pickupDateTime
    dropDateTime
    reciverDate
    receiverStatus
    totalOrderDistance
    payableBy
    weightInt
    parcelValue
    whetherCollected
  }
}
`
export const QUERY_ORDER_BY_BARCODE_NO = gql`
query Query($barcodeNo: String) {
  getOrderByBarcodeNo(barcodeNo: $barcodeNo) {
    id
    orderNo
    pickupAddress
    deliveryAddress
    pickupFullAddress
    deliveryFullAddress
    senderId
    senderName
    senderEmail
    senderContact
    receiverName
    receiverEmail
    receiverContact
    receiverCity
    receiverState
    otherOrderTypeDocument
    deliveryDate
    receiverPincode
    OrderType
    quickDate
    OtherOrderType
    parcelWeight
    parcelWeightType
    totalAmount
    createDateTime
    ScheduleDateTime
    servicetype
    paymentMethod
    PickUpfullAddress
    RecieverfullAddress
    paymentStatus
    deliveryBoyId
    deliveryBoyName
    deliveryboylatitude
    deliveryboylongitude
    heading
    pickupLatitude
    pickupLongitude
    descLatitude
    descLongitude
    deliveryBoyContact
    deliveryBoyEmail
    status
    delieveryBoyStatus
    senderStatus
    razorpayPaymentId
    bookingAmount
    pickupDateTime
    dropDateTime
    reciverDate
    receiverStatus
    totalOrderDistance
    weightInt
    barcodeNo
  }
}
`
export const QUERY_PENDING_ORDER_BY_DB = gql`
query Query($deliveryBoyId: ID) {
  getPendingOrders(deliveryBoyId: $deliveryBoyId) {
    id
    orderNo
    pickupAddress
    deliveryAddress
    pickupFullAddress
    deliveryFullAddress
    senderId
    senderName
    senderEmail
    senderContact
    receiverName
    receiverEmail
    receiverContact
    receiverCity
    receiverState
    otherOrderTypeDocument
    deliveryDate
    receiverPincode
    OrderType
    quickDate
    OtherOrderType
    parcelWeight
    parcelWeightType
    totalAmount
    createDateTime
    ScheduleDateTime
    servicetype
    paymentMethod
    PickUpfullAddress
    RecieverfullAddress
    paymentStatus
    deliveryBoyId
    deliveryBoyName
    deliveryboylatitude
    deliveryboylongitude
    heading
    pickupLatitude
    pickupLongitude
    descLatitude
    descLongitude
    deliveryBoyContact
    deliveryBoyEmail
    status
    delieveryBoyStatus
    senderStatus
    razorpayPaymentId
    bookingAmount
    pickupDateTime
    dropDateTime
    reciverDate
    receiverStatus
    totalOrderDistance
    weightVerifiction
    weightInt
    barcodeNo
    feedBack
  }
}
`

export const SEND_OTP = gql`
query Query($contact: String!, $otp: String!) {
  sendLoginOtp(contact: $contact, otp: $otp)
}

`

