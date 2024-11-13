import { Request, Response, NextFunction } from 'express';
import { wrapRequestHandler, success, error } from '../../../../../helpers/response'
import { createRouter } from '../../../../../routes/apiRouter'
import db from '../../../../../models';
import redisClient from '../../../../../Redis';
const handler = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await db.User.create(req.body)
        const response = success("Hurry", { data })
        redisClient.del('user')
        return res.json(response)
    } catch (err: any) {
        return res.json(error("Something went wrong", err))
    }
}

createRouter.post('/user', wrapRequestHandler(handler))