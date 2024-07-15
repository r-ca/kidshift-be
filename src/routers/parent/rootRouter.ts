import { requiredFieldMissingResponse } from '@src/models/commons/responses';
import { generateParentLoginCode } from '@src/services/parent/accountService';
import { Router, Request, Response } from 'express';


const commonRouter = Router();
const parentRouter = Router();

// Issue login code (for Alexa integration)
parentRouter.get('/issue', (req: Request, res: Response) => {
    let parentId;
    if (!req.user || !req.user.claims || !req.user.claims.sub) {
        const resp = requiredFieldMissingResponse(['JWT claims']);
        return res.status(resp.statusCode).json(resp);
    } else {
        parentId = req.user.claims.sub;
    }
    generateParentLoginCode(parentId).then((code) => {
        res.status(200).json({ code });
    }).catch((err) => {
        res.status(500).json({ message: "ログインコードの発行に失敗しました" });
    });
});

export { parentRouter, commonRouter };
