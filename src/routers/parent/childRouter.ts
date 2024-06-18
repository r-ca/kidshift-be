import { Router, Request, Response } from 'express';
import { getChilds, createChild } from '@src/services/childService';
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
    // 子供を追加
    res.status(501).json({
        message: 'WIP'
    });
});

router.get('/:childId/login', (req: Request, res: Response) => {
    // 子供のログイン
    res.status(501).json({
        message: 'WIP'
    });
});

router.delete('/:childId', (req: Request, res: Response) => {
    // 子供を削除
    res.status(501).json({
        message: 'WIP'
    });
});

router.put('/:childId', (req: Request, res: Response) => {
    // 子供情報を更新
    res.status(501).json({
        message: 'WIP'
    });
});
