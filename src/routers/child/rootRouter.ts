import { Router, Request, Response } from 'express';
import { generateLoginCode, getChilds, createChild, deleteChild, getChild, modifyChild } from '@src/services/parent/childService';
import { ChildListResponse } from '@src/models/Child'
import Logger from '@src/logger';
import { internalServerErrorResponse } from '@src/models/commons/responses';

const logger = new Logger();
const commonRouter = Router();
const parentRouter = Router();


commonRouter.get('/', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    const homeGroupId = req.user.claims.home_group_id;
    getChilds(homeGroupId).then((childListResponse: ChildListResponse) => {
        res.status(200).json(childListResponse);
    }).catch((err) => {
        logger.error('Failed to get children')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});


parentRouter.post('/', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    const homeGroupId = req.user.claims.home_group_id;
    // BodyがChildAddRequestにマッピングできるかチェック
    let requestBody = null;
    try {
        requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({
                message: 'リクエストボディが不正です'
            });
        }
        if (!requestBody.name) {
            return res.status(400).json({
                message: 'nameが不正です'
            });
        }
    } catch (e) {
        return res.status(400).json({
            message: 'リクエストボディが不正です'
        });
    }
    createChild(requestBody, homeGroupId).then((child) => {
        res.status(201).json(child);
    }).catch((err) => {
        logger.error('Failed to create child')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});


parentRouter.get('/:childId/login', (req: Request, res: Response) => {
    const childId = req.params.childId; // TODO: Validate childId
    generateLoginCode(childId).then((code) => {
        res.status(200).json({
            code: code
        });
    }).catch((err) => {
        logger.error('Failed to generate login code')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});

commonRouter.get('/:childId', (req: Request, res: Response) => {
    const childId = req.params.childId;
    getChild(childId).then((child) => {
        res.status(200).json(child);
    }).catch((err) => {
        logger.error('Failed to get child')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});

parentRouter.delete('/:childId', (req: Request, res: Response) => {
    const childId = req.params.childId; // TODO: Validate childId
    deleteChild(childId).then(() => {
        res.status(200).json({
            "message": "OK"
        });
    }).catch((err) => {
        logger.error('Failed to delete child')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});

parentRouter.put('/:childId', (req: Request, res: Response) => {
    const childId = req.params.childId; // TODO: Validate childId
    // TODO: ボディのバリデーション
    modifyChild(childId, req.body).then((child) => {
        res.status(200).json(child);
    }).catch((err) => {
        logger.error('Failed to modify child')
        logger.debug(err);
        res.status(internalServerErrorResponse().statusCode).json(internalServerErrorResponse().body);
    });
});

export { commonRouter, parentRouter };
