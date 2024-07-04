import { requestBodyEmptyResponse } from '@src/models/commons/responses';
import { Request, Response, NextFunction } from 'express';

export default function verifyBodyNotEmpty(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0) {
        res.status(requestBodyEmptyResponse().statusCode).json(requestBodyEmptyResponse().body);
    } else next();
}
