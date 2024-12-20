import { gql } from "graphql-tag";

const ModalDataDef = gql`
scalar DateTime
  type modalCat {
    id: ID
    name: String
  }
  type slot{
    endTime:String
    startTime:String
  }
 type timeSlots{
  planId:Int
  timeSlotId:Int
  slots:[slot]
 }
type modalPlan {
  id: ID
  name: String
  image: String
  description: String 
  price: Int
  credits: Int
  type: String
  timeSlots:[timeSlots]
}
type CatAds {
    id: ID
    category: String
    categoryId: Int
    city: String
    district: String
    address: String
    zip: String
    age: String
    title: String
    description: String
    mobileNumber: String
    whatsAppNumber: String
    ethnicity: String
    nationality: String
    breast: String
    hair: String
    bodyType: String
    pricePerHour: String
    createdById: Int
    createdByName: String
    services: String
    attentionTo: String
    profile: String
    placeOfService:String
    paymentMethod: String
    createdAt: DateTime
    updatedAt: DateTime
    message: String
    success: Boolean
  }
  type Query {
    modalCategory:[modalCat]
    modalPlans: [modalPlan]
    AdsOnCat(catId:ID):[CatAds]
  }
`;

export default ModalDataDef;
