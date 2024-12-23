import { gql } from "graphql-tag";

const stateDef = gql`
  type State {
    id: ID
    name: String
  }
  type City {
    id: ID
    name: String
    stateId: ID
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
