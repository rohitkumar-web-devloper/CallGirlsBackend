import { Request, Response, NextFunction } from "express";
import {
  wrapRequestHandler,
  success,
  error,
} from "../../../../../helpers/response";
import { retrieveRouter } from "../../../../../routes/apiRouter";
import db from "../../../../../models";
import redisClient from "../../../../../Redis";

const handler = async (req: Request, res: Response): Promise<any> => {
  try {
    let response;
    const cacheData = await redisClient.get("user");
    if (cacheData) {
      response = JSON.parse(cacheData);
    } else {
      const data = await db.User.findAndCountAll({
        attributes: ["id", "name", "email"],
      });
      await redisClient.set("user", JSON.stringify(data));
      response = success("Hurry", { data });
    }
    return res.json(response);
  } catch (err: any) {
    return res.json(error("Something went wrong", err));
  }
};

retrieveRouter.get("/users", wrapRequestHandler(handler));
