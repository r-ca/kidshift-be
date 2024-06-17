import { Request, Response, NextFunction } from "express";
import { Role } from "@src/enums";

export default function verifyParent(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        if (req.user.claims.role === Role.PARENT) {
            next();
        } else {
            res.status(401).json({
                message: '権限がありません(保護者のみ利用可能なAPIです)'
            });
        }
    } else {
        res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
}
