import { gql } from "graphql-tag";
const categoriesDef = gql`
  scalar DateTime
  type Category {
    id: ID
    name: String
    status:Boolean
    createdById: Int
    createdByName:String
    createdAt: DateTime
    updatedAt: DateTime
    message: String
    success:Boolean
  }
  type Query {
    categories: [Category]
    category(id: ID!): Category
  }

  type Mutation {
    createCategories(name: String , status:Boolean = false): Category
    updateCategories(id: ID!, name: String): Category
    deleteCategories(id: ID!): Category
  }
`;
export default categoriesDef;
