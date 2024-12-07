import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import categoriesDef from "./Categories/typedefs";
import Categories from "./Categories/resolver";
import adsDef from "./Ads/typedefs";
import Ads from "./Ads/resolver";

async function createApolloGraphQlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: [userDefs, categoriesDef ,adsDef],
    resolvers: [User, Categories ,Ads],
    csrfPrevention: false, 
  });
  
  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
