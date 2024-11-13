import { gql } from "graphql-tag";
const studentDef = gql`
  type Student {
    id: ID
    name: String
    email: String
    degree: String
    age: String
    createdAt: String
    updatedAt: String
    message: String
    success:Boolean
  }
  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  type Mutation {
    createStudent(
      name: String
      email: String
      degree: String
      age: String
    ): Student
    updateStudent(id: ID!, name: String, email: String , degree:String , age:String): Student
    deleteStudent(id: ID!): Student
  }
`;
export default studentDef;
