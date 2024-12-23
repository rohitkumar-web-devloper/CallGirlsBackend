import { gql } from "graphql-tag";

const adsDef = gql`
scalar DateTime
scalar Upload  
  type Ads {
    id: ID
    planId: Int;
    startTime: DateTime;
    endTime: DateTime;
    price: Int;
    email: String;
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
    services: [String]
    attentionTo: [String]
    profile: [String!]!
    placeOfService: [String]
    paymentMethod: [String]
    createdAt: DateTime
    updatedAt: DateTime
    message: String
    success: Boolean
  }
  type Response{
    message: String
    success: Boolean
  }
  input AdInput {
    planId: Int;
    startTime: DateTime;
    endTime: DateTime;
    price: Int;
    email: String;
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

  type Query {
    ads: [Ads]
    ad(id: ID!): Ads
  }

  type Mutation {
    createAd( input: AdInput ,  profile: [Upload]): Ads
    updateAd(id: Int, input: AdInput ,): Ads
    deleteAd(id:Int):Response
  }
`;

export default adsDef;
