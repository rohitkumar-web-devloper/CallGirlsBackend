import { gql } from "graphql-tag";

const adsDef = gql`
scalar DateTime
scalar Upload  
  type Ads {
    id: ID
    planId: Int
    planType:String
    startTime: DateTime
    endTime: DateTime
    price: Int
    email: String
    category: String
    categoryId: Int
    city: String
    state: String
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
    services: [Service!]!
    attentionTo: [Service!]!
    profile: [String!]!
    placeOfServices: [Service!]!
    paymentMethod: [String]
    createdAt: DateTime
    updatedAt: DateTime
  }
  type Service {
  name: String
}
  type Response{
    message: String
    success: Boolean
  }
  input AdInput {
    planId: Int
    planType:String
    startTime: DateTime
    endTime: DateTime
    price: Int
    email: String
    category: String
    categoryId: Int
    city: String
    state: String
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
    services: [String]
    attentionTo: [String]
    placeOfService: [String]
    paymentMethod: [String]
  }
  type PaginatedAds {
    ads: [Ads]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }
  input AdsFilter {
    categoryId:Int ,
    category_handler:String,
    city_handler:String,
    state:String,
    city:String,
    ethnicity:String , 
    nationality:String , 
    breast:String ,
    hair:String ,
    services:[String] ,
    attentionTo:[String], 
    placeOfService:[String]
  }
  type Query {
    ads(createdById:Int):[Ads]
    ad(id: ID!): Ads
    normalAds(page: Int, pageSize: Int, filter: AdsFilter):PaginatedAds
    premiumAds(page: Int, pageSize: Int, filter: AdsFilter):PaginatedAds
  }
  type Mutation {
    createAd( input: AdInput ,  profile: [Upload]): Ads
    updateAd(id: Int, input: AdInput ,): Ads
    deleteAd(id:Int):Response
  }
`;

export default adsDef;
