import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    // 子供の一覧を取得
    res.status(501).json({
        message: 'WIP'
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
