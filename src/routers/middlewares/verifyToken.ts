import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers["authorization"];
    let token;
    if (authorizationHeader) {
        const token_ = authorizationHeader.split(" ")[1];
        if (token_) {
            token = token_;
        } else {
            return res.status(401).send("アクセス拒否: アクセストークンが必要なエンドポイントです");
        }
    } else {
        return res.status(401).send("アクセス拒否: アクセストークンが必要なエンドポイントです");
    }
    try {
        jsonwebtoken.verify(token, "secret"); // TODO: ハードコードやめる
        req.user = { token, claims: jsonwebtoken.decode(token) };
        next();
    } catch (error) {
        return res.status(401).send("アクセス拒否: トークンの検証に失敗しました(有効期限切れか、不正なトークンです)");
    }
}
