import { internalServerErrorResponse, notFoundResponse, requiredFieldMissingResponse } from '@src/models/commons/responses';
import { HistoryListResponse, HistoryResponse } from '@src/models/History';
import { getHistories, updateHistoryPaidStatus } from '@src/services/historyService';
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

parentRouter.post("/:historyId/paid", (req, res) => {
    const isPaid = req.query.isPaid === "true";
    const historyId = req.params.historyId;
    if (!historyId) {
        const historyIdMissingResponse = requiredFieldMissingResponse(["historyId"]);
        res.status(historyIdMissingResponse.statusCode).send(historyIdMissingResponse.body);
        return;
    }
    updateHistoryPaidStatus(historyId, isPaid).then(() => {
        res.status(200).send(); // TODO: 固定値化
    });
});

export { parentRouter, commonRouter };
