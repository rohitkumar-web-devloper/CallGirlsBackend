import { gql } from "graphql-tag";

const planDefs = gql`
  scalar DateTime
  scalar FileUpload

  type Plan {
    id: ID
    name:String
    image: String
    description: String
    price: Int
    credits: Int
    timeSlots: String
    type: String
    status: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  type PaginatedPlans {
    plans: [Plan]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input PlanFilter {
    search: String
  }

  type Query {
    plans(page: Int, pageSize: Int, filter: PlanFilter): PaginatedPlans
    plan(id: ID!): Plan
  }

  type Mutation {
    createPlan(
      name:String
      image: FileUpload
      description: String
      price: Int
      credits: Int
      timeSlots: String
      type: String
      status: Boolean = false
    ): Plan
    updatePlan(
      id: ID!
      name:String
      description: String
      price: Int
      credits: Int
      timeSlots: String
      type: String
      status: Boolean
    ): Plan
    deletePlan(id: ID!): Plan
  }
`;

export default planDefs;
