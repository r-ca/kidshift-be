import { Router } from 'express';
import { Task } from '@prisma/client';
import { getTasksByUserId, getTasksByChildId } from '@src/services/taskService';

const router = Router();

router.get('/', (req, res) => {
    const body = req.body;
    if (body) {
        res.status(400).json({
            message: '不正なリクエスト: リクエストボディが空です'
        });
        return;
    }
    if (req.query.childId && req.query.userId) {
        res.status(400).json({
            message: '不正なリクエスト: childIdとuserIdはどちらか一方を指定してください'
        });
        return;
    }
    if (!req.query.childId && !req.query.userId) {
        res.status(400).json({
            message: '不正なリクエスト: childIdかuserIdのどちらかを指定してください'
        });
        return;
    }
    if (req.query.childId) {
        getTasksByChildId(req.query.childId as string)
            .then((tasks: Task[]) => {
                res.status(200).json(tasks);
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'エラーが発生しました',
                    error: err
                });
            });
        return;
    } else {
        getTasksByUserId(req.query.userId as string)
            .then((tasks: Task[]) => {
                res.status(200).json(tasks);
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'エラーが発生しました',
                    error: err
                });
            });
        return;
    }
});


