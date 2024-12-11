import { gql } from "graphql-tag";

const dashboardDef = gql`
  type Dashboard {
   addCount:Int
   userCount:Int
   planCount:Int
   categoryCount:Int
   timeSlotCount:Int
  }
  type Query {
    dashboard: Dashboard
  }
`;

export default dashboardDef;
