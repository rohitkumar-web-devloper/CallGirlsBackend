import { gql } from "graphql-tag";

const adsDef = gql`
scalar DateTime
  type Ads {

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
    services: [String]
    attentionTo: [String]
    profile: [String]
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
    services: [String]
    attentionTo: [String]
    profile: [String]
    placeOfService: [String]
    paymentMethod: [String]
  }

  type Query {
    ads: [Ads]
    ad(id: ID!): Ads
  }

  type Mutation {
    createAd(input: AdInput): Ads
    updateAd(id: Int, input: AdInput): Ads
    deleteAd(id:Int):Response
  }
`;

export default adsDef;
