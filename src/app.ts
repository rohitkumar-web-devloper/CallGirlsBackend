import express from "express";
import morgan from "morgan";
import client from "prom-client";
import responseTime from "response-time";
import { Request, Response } from "express";
import { reposneTimeHistogram, totalRequestCount } from "./Prometheus/Metrics";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("assets"));
app.use(morgan("dev"));

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req.route && req.route.path !== "/metrics") {
      totalRequestCount.inc();
      reposneTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode, // Use res.statusCode, not req.statusCode
        },
        time
      );
    }
  })
);
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
export default app;
