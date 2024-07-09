import { Router, Request, Response } from 'express';
import { findUserById, updateParentName } from '@src/utils/userUtils';
import Logger from '@src/logger';

const router = Router();
const logger = new Logger();
logger.setTag("accountRouter");
// Get userinfo
router.get('/', (req: Request, res: Response) => {
    if (!req.user || !req.user.claims || !req.user.claims.sub) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    findUserById(req.user.claims.sub).then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'ユーザが見つかりません'
            });
        }
        logger.debug(`User info: ${JSON.stringify(user)}`);
        res.status(200).json(user);
    }).catch(err => {
            logger.error('Failed to fetch user info');
            logger.debug(`Error: ${err}`);
            res.status(500).json({
                message: 'エラーが発生しました',
                detail: err
            });
        }
        );
});

router.put('/', (req: Request, res: Response) => {
    const name = req.body.displayName;
    if (!name) {
        return res.status(400).json({
            message: 'displayNameが指定されていません'
        });
    }
    if (!req.user || !req.user.claims || !req.user.claims.sub) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    updateParentName(req.user.claims.sub, name).then(user => {
        res.status(200).json(user);
    });
});

export default router;
