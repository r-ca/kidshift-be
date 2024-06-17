import { Router } from 'express';
import { Task } from '@prisma/client';
import { createTask, getTasks } from '@src/services/taskService';

const router = Router();

router.get('/', (req, res) => {
    const body = req.body;
    if (!body) {
        res.status(400).json({
            message: '不正なリクエスト: リクエストボディが空です'
        });
        return;
    }
    if (!body.home_group_id) {
        res.status(400).json({
            message: '不正なリクエスト: home_group_idは必須です'
        });
        return;
    } else {
        getTasks(body.home_group_id, body.child_id)
            .then((tasks: Task[]) => {
                res.status(200).json(tasks);
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'エラーが発生しました',
                    error: err
                });
            });
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    if (!body) {
        res.status(400).json({
            message: '不正なリクエスト: リクエストボディが空です'
        });
        return;
    }
    if (!body.child_id || !body.user_id || !body.title || !body.description) {
        res.status(400).json({
            message: '不正なリクエスト: child_id, user_id, title, descriptionは必須です'
        });
        return;
    } else {
        createTask(body)
            .then((task: Task) => {
                res.status(201).json(task);
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'エラーが発生しました',
                    error: err
                });
            });
    }
});
