import express from "express";
// import morgan from "morgan";
import path from "path";
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(morgan("dev"));
export default app;


