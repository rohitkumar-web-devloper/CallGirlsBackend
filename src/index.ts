import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { PORT } from "./constants/Variables";
import requireDir from "require-dir";
import redisClient from "./Redis";
import { createLogger } from "winston";
import LokiTransport from "winston-loki";
import { metricsServer } from "./Prometheus/Metrics";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQlServer from "./Graphql";
requireDir("./routes");
requireDir("./controllers", { recurse: true });
(async () => {
  redisClient.on("error", (error) => {
    console.log(error, "Redis Connection Error");
  });
  await redisClient.connect();
  console.log("Redis Connected");
})();

const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100",
    }),
  ],
};
const logger = createLogger(options);

app.get("/", (req, res) => {
  logger.info("Req came from / Route");
  res.send("<center><h2>Welcome to Developer world...Ram</h2></center>");
});

app.get("/dude", (req, res) => {
  logger.error("Req came from /slow Route");
  res.json({ type: "success", name: "Rohit" });
});

// GraphQL connection 
const startServer = async () => {
  app.use("/graphql", expressMiddleware( await createApolloGraphQlServer()))
  app.listen(PORT, () => {
    console.log(
      "Server is running process on Port : " + `http://localhost:${PORT}`
    );
    metricsServer();
  });
}
startServer()





