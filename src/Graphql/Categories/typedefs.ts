import { gql } from "graphql-tag";

const categoriesDef = gql`
  scalar DateTime

  type Category {
    id: ID
    name: String
    status: Boolean
    createdById: Int
    createdByName: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PaginatedCategories {
    categories: [Category]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input CategoryFilter {
    name: String
    status: Boolean
  }

  type Query {
    categories(page: Int, pageSize: Int, filter: CategoryFilter): PaginatedCategories
    category(id: ID!): Category
  }

  type Mutation {
    createCategories(name: String, status: Boolean = false): Category
    updateCategories(id: ID!, name: String, status: Boolean): Category
    deleteCategories(id: ID!): Category
  }
`;

export default categoriesDef;
