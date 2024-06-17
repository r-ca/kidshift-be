import { Router } from 'express';
import Logger from '@src/logger';

import authRouter from './authRouter';
import taskRouter from './taskRouter';
import metaRouter from './metaRouter';

const router = Router();
const logger = new Logger();
logger.setTag('parent/index.ts');

router.use('/auth', authRouter);
router.use('/task', taskRouter);
router.use('/meta', metaRouter);

export default router;
