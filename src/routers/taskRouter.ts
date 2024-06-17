import { Router } from 'express';
import { Task } from '@prisma/client';
import { createTask, getTasks, getTasksByChild, updateTask, deleteTask } from '@src/services/taskService';

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
        if (!body.child_id) {
            getTasks(body.home_group_id)
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
            getTasksByChild(body.child_id)
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
    if (!body.displayName || !body.reward) {
        res.status(400).json({
            message: '不正なリクエスト: displayName, rewardは必須です'
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

router.put('/:taskId', (req, res) => {
    res.status(501).json({
        message: 'WIP'
    });
});

router.delete('/:taskId', (req, res) => {
    deleteTask(req.params.taskId)
        .then(() => {
            res.status(200).json({
                message: 'OK',
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'エラーが発生しました',
                error: err
            });
        });
});

export default router;
