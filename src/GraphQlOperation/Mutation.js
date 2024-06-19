/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'

export const MUTATION_ADD_DELIVERY_BOY_IN_ORDER = gql`

mutation Mutation($adddeliveryboyInput: AdddeliveryboyInput) {
    addDeliveryBoy(adddeliveryboyInput: $adddeliveryboyInput) {
      id
    }
  }
`;

export const MUTATION_UPDATE_GEOLOCATION = gql`
mutation UpdateGeolocationOrder($updateGeolocationOrderInput: updateGeolocationOrderInput) {
    updateGeolocationOrder(UpdateGeolocationOrderInput: $updateGeolocationOrderInput) {
      id
    }
  }
` ;

export const MUTATION_LOGIN_DELIVERY_BOY = gql`
mutation Mutation($deliveryboyloginInput: deliveryboyloginInput) {
  deliveryboylogin(DeliveryboyloginInput: $deliveryboyloginInput) {
    deliveryToken
    userId
  }
}

`
export const MUTATION_LOCATION_DELIVERY_BOY = gql`
mutation Mutation($locationDeliveryBoyInput: locationDeliveryBoyInput) {
  addLocationDeliveryBoy(LocationDeliveryBoyInput: $locationDeliveryBoyInput) {
    id
  }
}

`
export const MUTATION_PICKUP_STATUS = gql`
mutation Mutation($orderId: ID) {
  scannerStatus(orderId: $orderId) {
    id
  }
}
`;

export const MUTATION_DROP_STATUS = gql`
mutation Mutation($orderId: ID) {
  scannerDropStatus(orderId: $orderId) {
    id
  }
}
`;

export const MUTATION_DROP_AT_ORIGIN_HUB = gql`
mutation Mutation($orderId: ID) {
  updateDropAtOriginHubStatus(orderId: $orderId) {
    id
  }
}
`;

export const MUTATION_PICKED_FROM_ORIGIN_HUB = gql`
mutation Mutation($orderId: ID) {
  updatePickedFromOriginHubStatus(orderId: $orderId) {
    id
  }
}
`;

export const MUTATION_DROP_TO_DESTINATION_HUB = gql`
mutation Mutation($orderId: ID) {
  updateDropToDestinationHubStatus(orderId: $orderId) {
    id
  }
}
`;

export const MUTATION_PICKED_FROM_DESTINATION_HUB = gql`
mutation Mutation($orderId: ID) {
  updatePickedFromDestinationHubStatus(orderId: $orderId) {
    id
  }
}
`;
export const MUTATION_DB_DEVICE_TOKEN = gql`
mutation UpdateDeliveryBoyDeviceToken($deviceToken: String, $deliveryBoyId: ID) {
  updateDeliveryBoyDeviceToken(deviceToken: $deviceToken, deliveryBoyId: $deliveryBoyId) {
    id
  }
}
`;
export const MUTATION_UPDATE_BARCODE_NO = gql`
mutation Mutation($orderId: ID, $barcodeNo: String) {
  updateBarcodeToOrder(orderId: $orderId, barcodeNo: $barcodeNo) {
    id
  }
}
`;


export const MUTATION_RESET_PASSWORD_DELIVERY_BOY = gql`
mutation CreatefeedBack($resetPasswordInput: resetPasswordInput) {
  resetPasswordDeliveryboy(ResetPasswordInput: $resetPasswordInput) {
    id
  }
}

`

export const MUTATION_CHECK_CONTACT = gql`
mutation Mutation($contact: String) {
  checkContact(contact: $contact) {
    id
  }
}
`

export const MUTATION_UPDATE_DB_TOTAL_KM = gql`
mutation UpdateTotalKmDeliveryBoy($deliveryBoyId: ID, $kms: String) {
  updateTotalKmDeliveryBoy(deliveryBoyId: $deliveryBoyId, kms: $kms) {
    id
  }
}
`

export const MUTATION_WEIGHT_VERIFICATION = gql`
mutation ResetPasswordDeliveryboy($weightInput: weightInput) {
  createWeightVerification(WeightInput: $weightInput) {
    id
  }
}
`