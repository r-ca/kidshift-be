// レスポンスBodyのロギング

import { getRequestLogger } from "@src/singleton";
import { NextFunction, Response, Request } from "express";

export default function responseLogging(req: Request, res: Response, next: NextFunction) {
    const logger = getRequestLogger();
    const originalResp = res.send;
    res.send = function (body: any) {
        logger.debug(`Response body: ${JSON.stringify(body)}`);
        return originalResp.call(this, body);
    };
    next();
}
