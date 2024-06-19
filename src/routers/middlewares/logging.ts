import { getRequestLogger } from '@src/singleton';
import { Request, Response, NextFunction } from 'express';

export default function logging(req: Request, res: Response, next: NextFunction) {
    const logger = getRequestLogger();
    logger.info(`[${req.method}] ${req.originalUrl}`);
    logger.debug(`Request headers: ${JSON.stringify(req.headers)}, Request body: ${JSON.stringify(req.body)}`);
    next();
}
