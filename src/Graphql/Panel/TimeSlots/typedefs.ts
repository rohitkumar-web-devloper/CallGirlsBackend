import { gql } from "graphql-tag";

const TimeSlotDefs = gql`
  scalar DateTime

  type TimeSlot {
    id: ID
    name:String
    startTime: DateTime
    endTime: DateTime
    createdById:Int
    createdByName: String
    status: Boolean
  }

  type PaginatedTimeSlots {
    timeSlot: [TimeSlot]
    totalCount: Int
    page: Int
    pageSize: Int
    totalPages: Int
  }

  input PlanFilter {
    search: String
    status:Boolean 
    pagination:Boolean
  }

  type Query {
    timeSlots(page: Int, pageSize: Int, filter: PlanFilter ): PaginatedTimeSlots
    timeSlot(id: ID!): TimeSlot
  }

  type Mutation {
    createTimeSlot(
      name:String
      startTime: String
      endTime: String
      status: Boolean = false
    ): TimeSlot
    updateTimeSlot(
      id: ID!
      name:String
      startTime: String
      endTime: String
      status: Boolean = false
    ): TimeSlot
    deleteTimeSlot(id: ID!): TimeSlot
  }
`;

export default TimeSlotDefs;
