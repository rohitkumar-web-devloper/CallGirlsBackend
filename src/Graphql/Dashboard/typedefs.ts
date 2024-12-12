import { gql } from "graphql-tag";

const dashboardDef = gql`
  type Dashboard {
   Adds:Int
   Users:Int
   Plans:Int
   Categories:Int
   TimeSlots:Int
  }
  type Query {
    dashboard: Dashboard
  }
`;

export default dashboardDef;
