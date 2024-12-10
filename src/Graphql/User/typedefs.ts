import { gql } from "graphql-tag";

const userDefs = gql`
  scalar DateTime
  scalar Upload  

  type User {
    id: ID
    name: String
    email: String
    password: String
    token: String
    profile: String 
    status: Boolean
    mobile: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PaginatedUsers {
    users: [User]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input UserFilter {
    search: String
  }

  type LogoutResponse {
    success: Boolean
    message: String
  }

  type Query {
    users(page: Int, pageSize: Int, filter: UserFilter): PaginatedUsers
    user(id: ID!): User
  }

  type Mutation {
    loginUser(email: String, password: String): User
    logoutUser: LogoutResponse
    createUser(
      name: String
      email: String
      password: String
      status: Boolean
      mobile: String
      profile: Upload 
    ): User
    updateUser(id: ID!, name: String, email: String, status: Boolean, password: String, mobile: String): User
    deleteUser(id: ID!): User
  }
`;

export default userDefs;
