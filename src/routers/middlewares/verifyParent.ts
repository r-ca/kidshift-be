import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Role } from "@src/enums";

export default function verifyParent(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers["authorization"];
    let token;
    if (authorizationHeader) {
        const token_ = authorizationHeader.split(" ")[1];
        if (token_) {
            token = token_;
        } else {
            return res.status(401).send("アクセス拒否: アクセストークンが必要なエンドポイントです");
        }
    } else return;
    try {
        // クレームに含まれるroleがPARENTであることを確認する
        const decoded = jsonwebtoken.verify(token, "secret") as { role: string };
        if (decoded.role !== Role.PARENT) {
            return res.status(401).send("アクセス拒否: 親ユーザーのみアクセス可能なエンドポイントです");
        }
        next();
    } catch (error) {
        // トークンの検証に失敗した場合（この前にトークン検証が実行されているので流れることはないはず）
        // TODO: 複数回解析する必要はなさそう
    }
}
