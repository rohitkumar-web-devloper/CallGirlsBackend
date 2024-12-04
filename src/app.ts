import express from "express";
import morgan from "morgan";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("assets"));
app.use(morgan("dev"));
export default app;

