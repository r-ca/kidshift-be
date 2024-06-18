import { Router } from 'express';
import { Task } from '@prisma/client';
import { getTask, createTask, getTasks, getTasksByChild, updateTask, deleteTask } from '@src/services/taskService';

const router = Router();

router.get('/', (req, res) => {
    if (req.user === undefined) {
        res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
        return;
    }
    getTasks(req.user.claims.home_group_id)
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
        const task: Task = {} as Task;

        if (req.user === undefined) {
            res.status(500).json({
                message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
            });
            return;
        }

        task.display_name = body.displayName;
        task.reward = body.reward;
        task.home_group_id = req.user.claims.home_group_id;

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

router.get('/:taskId', (req, res) => {
    getTask(req.params.taskId)
        .then((task: Task | null) => {
            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({
                    message: 'タスクが見つかりませんでした'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'エラーが発生しました',
                error: err
            });
        });
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
