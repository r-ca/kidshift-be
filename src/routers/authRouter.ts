import { Router, Request, Response } from 'express';
import { registUser, loginUser } from '@src/services/authService'; 
import Logger from '@src/logger';

const router = Router();
const logger = new Logger();
logger.setTag('authRouter');

router.post('/register', (req: Request, res: Response) => {
    const { email, password } = req.body;
    registUser(email, password)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(401).json({ message: "ユーザー登録失敗: すでに登録されているemailです" });
            logger.warn("Regist user failed");
            logger.debug(err.message);
        });
});

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    loginUser(email, password)
        .then((token) => {
            if(token) {
                res.json({ token });
            } else {
                res.status(401).json({ message: "ログイン失敗: emailかpasswordが間違っています" });
                logger.warn("Login failed");
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "ログイン失敗: サーバーエラー" });
            logger.error("Login failed");
            logger.debug(err.message);
        });
});

export default router;
