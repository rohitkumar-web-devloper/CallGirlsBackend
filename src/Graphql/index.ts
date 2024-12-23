import { ApolloServer } from "@apollo/server";
import userDefs from "./Panel/User/typedefs";
import User from "./Panel/User/resolver";
import categoriesDef from "./Panel/Categories/typedefs";
import Categories from "./Panel/Categories/resolver";
import adsDef from "./Panel/Ads/typedefs";
import Ads from "./Panel/Ads/resolver";
import { makeExecutableSchema } from "@graphql-tools/schema";
import planDefs from "./Panel/Plan/typedefs";
import Plan from "./Panel/Plan/resolver";
import TimeSlotDefs from "./Panel/TimeSlots/typedefs";
import TimeSlot from "./Panel/TimeSlots/resolver";
import dashboardDef from "./Panel/Dashboard/typedefs";
import Dashboard from "./Panel/Dashboard/resolver";

import HomeDef from "./Web/Home/typedefs";
import Home from "./Web/Home/resolver";
import customerDefs from "./Web/Customers/typedefs";
import Customer from "./Web/Customers/resolver";
import ModalDataDef from "./Web/ModalData/typedefs";
import ModalData from "./Web/ModalData/resolver";
import stateDef from "./Panel/State/typedefs";
import States from "./Panel/State/resolver";

async function createApolloGraphQlServer() {
  const schema = makeExecutableSchema({
    typeDefs: [userDefs, categoriesDef, adsDef , planDefs, TimeSlotDefs , dashboardDef , customerDefs , HomeDef , ModalDataDef , stateDef],
    resolvers: [
      User,
      Categories,
      Ads,
      Plan,
      TimeSlot,
      Dashboard,
      Customer,
      Home,
      ModalData,
      States
    ],
    
  });

  const gqlServer = new ApolloServer({
    schema, // Provide the schema directly
    csrfPrevention: false,
  
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphQlServer;
