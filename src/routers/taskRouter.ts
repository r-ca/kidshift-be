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
});
