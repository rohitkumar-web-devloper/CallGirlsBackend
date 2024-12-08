import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import categoriesDef from "./Categories/typedefs";
import Categories from "./Categories/resolver";
import adsDef from "./Ads/typedefs";
import Ads from "./Ads/resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";

async function createApolloGraphQlServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userDefs, categoriesDef, adsDef],
    resolvers: [User, Categories, Ads],
  });

  const gqlServer = new ApolloServer({
    schema, // Provide the schema directly
    csrfPrevention: false,
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
