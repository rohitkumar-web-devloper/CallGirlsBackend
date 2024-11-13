import client from "prom-client";
import app from "../app"; // Assuming `app` is your Express app instance
import { Request, Response } from "express";
export const reposneTimeHistogram = new client.Histogram({
  name: "Response_Time_Durtion_seconds",
  help: "Rest api response time in second",
  labelNames: ["method", "route", "status_code"],
});
export const databaseReposneTImeHistogram = new client.Histogram({
  name: "DB_Response_Time_Durtion_seconds",
  help: "DataBase api response time in second",
  labelNames: ["operation", "success"],
});
export const totalRequestCount = new client.Counter({
  name: "total_req",
  help: "Tells total req",
});
export function metricsServer() {
  client.collectDefaultMetrics();
  app.get("/metrics", async (req: Request, res: Response): Promise<void> => {
    try {
      res.set("Content-Type", client.register.contentType);
      const metrics = await client.register.metrics();
      res.send(metrics);
    } catch (error) {
      res.status(500).send("Error collecting metrics");
    }
  });

  app.listen(9090, () => {
    console.log("Metric server started at http://localhost:9090");
  });
}
