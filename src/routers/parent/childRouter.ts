import { Router, Request, Response } from 'express';
import { generateLoginCode, getChilds, createChild, deleteChild } from '@src/services/childService';
import Logger from '@src/logger';

const router = Router();
const logger = new Logger();
logger.setTag('parent/childRouter');

router.get('/', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    const homeGroupId = req.user.claims.home_group_id;
    getChilds(homeGroupId).then((children) => {
        res.status(200).json(children);
    }).catch((err) => {
        logger.error('Failed to get children')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});

router.post('/', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    const homeGroupId = req.user.claims.home_group_id;
    const childName = req.body.name;
    createChild(childName, homeGroupId).then((child) => {
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

router.get('/:childId/login', (req: Request, res: Response) => {
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

router.delete('/:childId', (req: Request, res: Response) => {
    const childId = req.params.childId; // TODO: Validate childId
    deleteChild(childId).then((child) => {
        res.status(200).json(child);
    }).catch((err) => {
        logger.error('Failed to delete child')
        logger.debug(err);
        res.status(500).json({
            message: 'エラーが発生しました',
            detail: err
        });
    });
});

router.put('/:childId', (req: Request, res: Response) => {
    // 子供情報を更新
    res.status(501).json({
        message: 'WIP'
    });
});

export default router;
