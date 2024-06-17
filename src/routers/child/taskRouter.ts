import { Router, Request, Response } from 'express';
import { registCompleteTask } from '@src/services/taskService';
import Logger from '@src/logger';

const router = Router();
const logger = new Logger();
logger.setTag('child/taskRouter.ts');

router.get('/', (req: Request, res: Response) => {
    res.status(501).send('WIP');
});

router.get('/:taskId', (req: Request, res: Response) => {
    res.status(501).send('WIP');
});

router.post('/:taskId/complete', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
    }
    logger.info(`Task complete request from ${req.user.claims.sub} for task ${req.params.taskId}`);
    try {
        registCompleteTask(req.params.taskId, req.user.claims.sub);
    } catch (error) {
        logger.error(`Failed to complete task: ${error}`);
        return res.status(500).json({
            message: 'エラーが発生しました(タスクの完了に失敗しました)'
        });
    }
    logger.info(`Task ${req.params.taskId} completed by ${req.user.claims.sub}`);
    res.status(200).json({
        message: 'タスクを完了しました'
    });
});
export default router;
