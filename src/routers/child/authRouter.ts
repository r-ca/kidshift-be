import { Router, Request, Response } from 'express';
import { login } from '@src/services/child/authService';

const router = Router();

// login
router.post('/login', (req: Request, res: Response) => {
    const code: number = req.body.code;
    if (!code) {
        return res.status(400).json({ message: 'ログインコードが指定されていません' });
    }
    login(code).then((token) => {
        res.status(200).json({ accessToken: token });
    }).catch((err) => {
        res.status(500).json({ message: 'ログインに失敗しました', detail: err });
    });
});
