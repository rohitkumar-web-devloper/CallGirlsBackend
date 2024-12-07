import { gql } from "graphql-tag";

const userDefs = gql`
  scalar DateTime
  scalar FileUpload

  type User {
    id: ID
    name: String
    email: String
    password: String
    token: String
    createdAt: DateTime
    updatedAt: DateTime
    message: String
    success: Boolean
    profile: String # Profile field for uploaded files (URL or path)
  }

  type PaginatedUsers {
    users: [User]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input UserFilter {
    name: String
    email: String
  }

  type Query {
    users(page: Int, pageSize: Int, filter: UserFilter): PaginatedUsers
    user(id: ID!): User
  }

  type Mutation {
    loginUser(email: String, password: String): User
    createUser(
      name: String
      email: String
      password: String
      profile: FileUpload   
    ): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
  }
`;

export default userDefs;
