import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import categoriesDef from "./Categories/typedefs";
import Categories from "./Categories/resolver";

async function createApolloGraphQlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: [userDefs, categoriesDef],
    resolvers: [User, Categories],
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
