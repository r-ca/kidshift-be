import { Router, Request, Response } from 'express';
import { login } from '@src/services/child/authService';

const router = Router();

// login
router.post('/login', (req: Request, res: Response) => {
    const loginCode: string = req.body.loginCode;
    if (!loginCode) {
        return res.status(400).json({ message: 'ログインコードが指定されていません' });
    }
    login(loginCode).then((token) => {
        res.status(200).json({ accessToken: token });
    }).catch((err) => {
        res.status(500).json({ message: 'ログインに失敗しました', detail: err });
    });
});

export default router;
