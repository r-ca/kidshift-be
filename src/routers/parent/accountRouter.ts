import { Router, Request, Response } from 'express';
import { findUserById } from '@src/utils/userUtils';

const router = Router();

// Get userinfo
router.get('/', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    const user = findUserById(req.user.claims.sub);
    if (!user) {
        return res.status(404).json({
            message: 'ユーザが見つかりません'
        });
    }
    res.status(200).json(user);
});
    
