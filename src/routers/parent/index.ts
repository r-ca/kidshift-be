import { Router } from 'express';
import Logger from '@src/logger';

import authRouter from './authRouter';
import taskRouter from './taskRouter';

const router = Router();
const logger = new Logger();
logger.setTag('parent/index.ts');

router.use('/auth', authRouter);
router.use('/task', taskRouter);

export default router;
