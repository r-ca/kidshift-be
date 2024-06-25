import { Router } from 'express';
import { Task } from '@prisma/client';
import { getTask, createTask, getTasks, updateTask, deleteTask, registCompleteTask } from '@src/services/taskService';
import { TaskListResponse, TaskAddRequest } from '@src/models/Task';

const router = Router();

router.get('/', (req, res) => {
    if (req.user === undefined) {
        res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
        return;
    }
    getTasks(req.user.claims.home_group_id)
        .then((taskListResponse: TaskListResponse) => {
            res.status(200).json(taskListResponse);
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
    // BodyをTaskAddRequestにマッピングできるかチェック
    let requestBody: TaskAddRequest;
    try {
        requestBody = req.body;
        if (!requestBody) {
            res.status(400).json({
                message: 'リクエストボディが空です'
            });
            return;
        }
        if (!requestBody.name || !requestBody.reward) {
            res.status(400).json({
                message: 'name, rewardは必須です'
            });
            return;
        }
    } catch (e) {
        res.status(400).json({
            message: 'リクエストボディが不正です'
        });
        return;
    }

    if (req.user === undefined) {
        res.status(500).json({
            message: 'エラーが発生しました(JWT解析結果が不正/未設定です)'
        });
        return;
    }

    createTask(task)
        .then((task: Task) => {
            res.status(201).json(task);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'エラーが発生しました',
                error: err
            });
        });
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
        // TODO: 共通化
        task.id = req.params.taskId;
        task.display_name = body.displayName;
        task.reward = body.reward;
        updateTask(task)
            .then((task: Task) => {
                res.status(200).json(task);
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'エラーが発生しました',
                    error: err
                });
            });
    }
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

router.post('/:taskId/complete', (req, res) => {
    if (req.query.childId === undefined) {
        res.status(400).json({
            message: '不正なリクエスト: childIdは必須です'
        });
        return;
    }
    registCompleteTask(req.params.taskId, req.query.childId as string)
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
