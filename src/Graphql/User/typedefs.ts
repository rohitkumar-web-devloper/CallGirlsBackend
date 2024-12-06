import { gql } from "graphql-tag";
const userDefs = gql`
scalar DateTime
  type User {
    id: ID
    name: String
    email: String
    password:String
    token:String
    createdAt: DateTime
    updatedAt: DateTime
    message:String
    success:Boolean

  }
  type Query {
    users: [User] 
    user(id: ID!): User
  }

  type Mutation {
    loginUser(email:String, password:String):User
    createUser(name: String, email: String , password:String): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
  }
`;
export default userDefs;
