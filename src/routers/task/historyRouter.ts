import { internalServerErrorResponse, notFoundResponse, requiredFieldMissingResponse } from '@src/models/commons/responses';
import { HistoryListResponse, HistoryResponse } from '@src/models/History';
import { getHistories } from '@src/services/historyService';
import { Router } from 'express';
import Logger from '@src/logger'

const logger = new Logger();
logger.setTag('historyRouter');
const parentRouter = Router(); // 親専用エンドポイント
const commonRouter = Router(); // 共用エンドポイント

commonRouter.get("/:childId", (req, res) => {
    const containPaid = req.query.containPaid === "true";
    const childId = req.params.childId;
    if (!childId) {
        const childIdMissingResponse = requiredFieldMissingResponse(["childId"]);
        res.status(childIdMissingResponse.statusCode).send(childIdMissingResponse.body);
        return;
    }
    getHistories(childId, containPaid).then((histories: HistoryResponse[]) => {
        res.status(200).send({
            list: histories,
        } as HistoryListResponse);
    }).catch((err) => {
        res.status(internalServerErrorResponse().statusCode).send(internalServerErrorResponse().body);
        logger.error(err.message);
    });
});

parentRouter.delete("/:historyId", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴削除
});

parentRouter.patch("/:childId/:historyId", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴手動追加
});

export { parentRouter, commonRouter };
