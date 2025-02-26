import { Router, Request, Response } from 'express';
import { registUser, loginUser, loginUserWithCode } from '@src/services/parent/authService';
import Logger from '@src/logger';
import { TokenResponse } from '@src/models/Token';

const router = Router();
const logger = new Logger();
logger.setTag('authRouter');

router.post('/register', (req: Request, res: Response) => {
    const { email, password } = req.body;
    registUser(email, password)
        .then((token: String) => {
            res.status(201).json({
                "accessToken": token
            } as TokenResponse);
        })
        .catch((err) => {
            res.status(401).json({ message: "ユーザー登録失敗: すでに登録されているemailです" });
            logger.warn("Regist user failed");
            logger.debug(err.message);
        });
});

router.post('/login', (req: Request, res: Response) => {
    // フィールドにcodeがあるか確認
    if (req.body.code) {
        // codeがある場合はcodeでログイン
        logger.info("Login with code");
        const { code } = req.body;
        loginUserWithCode(code)
            .then((token: String | null) => {
                if (token) {
                    res.status(200).json({
                        "accessToken": token
                    } as TokenResponse);
                } else {
                    res.status(401).json({ message: "ログイン失敗: codeが間違っています" });
                    logger.warn("Login failed");
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "ログイン失敗: サーバーエラー" });
                logger.error("Login failed");
                logger.debug(err.message);
            });
        return;
    }
    const { email, password } = req.body;
    loginUser(email, password)
        .then((token: String | null) => {
            if (token) {
                res.status(200).json({
                    "accessToken": token
                } as TokenResponse);
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
