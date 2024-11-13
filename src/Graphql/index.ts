import { ApolloServer } from "@apollo/server";
import userDefs from "./User/typedefs";
import User from "./User/resolver";
import studentDef from "./Student/typedefs";
import Student from "./Student/resolver";

async function createApolloGraphQlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: [userDefs, studentDef],
    resolvers: [User , Student],
  });
  await gqlServer.start();
  return gqlServer;
}
export default createApolloGraphQlServer;
