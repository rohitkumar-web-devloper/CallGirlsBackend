import { gql } from "graphql-tag";

const HomeDef = gql`
  type Ad {
    city: String
    city_count: Int
  }

  type Home {
    id: ID
    name: String
    handler:String
    image: String
    description: String
    ads: [Ad] 
  }

  type Query {
    homeCategory: [Home]
  }
`;

export default HomeDef;
