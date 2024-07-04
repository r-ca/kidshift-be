import { Request, Response, NextFunction } from "express";
import { Role } from "@src/enums";
import { jwtVerifyErrorResponse, notPermittedResponse } from "@src/models/commons/responses";

export default function verifyParent(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        if (req.user.claims.role === Role.PARENT) {
            next();
        } else {
            res.status(notPermittedResponse().statusCode).json(notPermittedResponse().body);
        }
    } else {
        res.status(jwtVerifyErrorResponse().statusCode).json(jwtVerifyErrorResponse().body);
    }
}
