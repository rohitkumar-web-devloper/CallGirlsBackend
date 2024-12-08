import { gql } from "graphql-tag";

const planDefs = gql`
  scalar DateTime
  scalar FileUpload

  type Plan {
    id: ID
    image:String
    description: String
    price: String
    credits: String
    timeSlots: Int[]
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
    description: String
  }


  type Query {
    plans(page: Int, pageSize: Int, filter: PlanFilter): PaginatedPlans
    plan(id: ID!): Plan
  }

  type Mutation {
    createPlan(
      image: FileUpload
      description: String
      price: Int
      credits:Int
      timeSlots:Int[]
      type: String
      status: Boolean
    ): Plan
    updatePlan(id: ID!, description:String , price:Int, credits:Int , timeSlots:Int[] , type:String, status:Boolean): User
    deletePlan(id: ID!): Plan
  } 
`;

export default planDefs;
