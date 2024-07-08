import { notFoundResponse, requiredFieldMissingResponse } from '@src/models/commons/responses';
import { HistoryListResponse, HistoryResponse } from '@src/models/History';
import { getHistories } from '@src/services/historyService';
import { Router } from 'express';

const parentRouter = Router(); // 親専用エンドポイント
const commonRouter = Router(); // 共用エンドポイント

commonRouter.get("/:childId", (req, res) => {
    const childId = req.params.childId;
    if (!childId) {
        const childIdMissingResponse = requiredFieldMissingResponse(["childId"]);
        res.status(childIdMissingResponse.statusCode).send(childIdMissingResponse.body);
        return;
    }
    getHistories(childId).then((histories: HistoryResponse[]) => {
        if (!histories || histories.length === 0) {
            res.status(notFoundResponse().statusCode).send(notFoundResponse().body);
            return;
        }
        res.status(200).send({
            list: histories,
        } as HistoryListResponse);
    });
});

parentRouter.delete("/:historyId", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴削除
});

parentRouter.post("/", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴手動追加
});

export { parentRouter, commonRouter };
