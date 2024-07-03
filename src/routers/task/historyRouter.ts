import { Router } from 'express';

const parentRouter = Router(); // 親専用エンドポイント
const commonRouter = Router(); // 共用エンドポイント

commonRouter.get("/", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴一覧
});

parentRouter.delete("/:historyId", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴削除
});

parentRouter.post("/", (req, res) => {
    res.status(501).send("WIP");
    // TODO: 履歴手動追加
});
