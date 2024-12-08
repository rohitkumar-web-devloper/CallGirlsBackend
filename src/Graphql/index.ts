import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import categoriesDef from "./Categories/typedefs";
import Categories from "./Categories/resolver";
import adsDef from "./Ads/typedefs";
import Ads from "./Ads/resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";
import planDefs from "./Plan/typedefs";
import Plan from "./Plan/resolver";

async function createApolloGraphQlServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userDefs, categoriesDef, adsDef , planDefs],
    resolvers: [User, Categories, Ads , Plan],
  });

  const gqlServer = new ApolloServer({
    schema, // Provide the schema directly
    csrfPrevention: false,
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
