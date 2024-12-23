import { gql } from "graphql-tag";

const stateDef = gql`
scalar DateTime
  type State {
    id: ID
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type City {
    id: ID
    name: String
    stateId: ID
    createdAt: DateTime
    updatedAt: DateTime
  }
  input UserFilter {
    search: String
  }
  type PaginationState {
    states: [State]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }
  type PaginationCity {
    cities: [City]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }
  type Query {
    states(page: Int, pageSize: Int, filter: UserFilter): PaginationState
    cities(stateId:ID , page: Int, pageSize: Int, filter: UserFilter):PaginationCity
  }
  type Mutation {
    createCity(name: String, stateId: ID): City
    updateCity(id:Int,name: String, stateId: ID): City
  }
`;

export default stateDef;
