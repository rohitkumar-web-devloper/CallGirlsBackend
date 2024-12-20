import { gql } from "graphql-tag";

const customerDefs = gql`
  scalar DateTime
  scalar Upload  

  type Customer {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    token: String
    profile: String 
    status: Boolean
    mobile: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PaginatedCustomer {
    customers: [Customer]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input CustomerFilter {
    search: String
  }

  type LogoutResponse {
    success: Boolean
    message: String
  }

  type Query {
    customers(page: Int, pageSize: Int, filter: UserFilter): PaginatedCustomer
    customer(id: ID!): User
  }

  type Mutation {
    loginCustomer(email: String, password: String): Customer
    forgatePassword(email: String, password: String): Customer
    logoutCustomer: LogoutResponse
    registerCustomer(
      firstName: String
      lastName: String
      email: String
      password: String
      status: Boolean = true
      mobile: String
      profile: Upload
    ): Customer
    updateCustomer( firstName: String,  lastName:String,email: String, status: Boolean, password: String, mobile: String , profile:Upload ): Customer
  }
`;

export default customerDefs;
