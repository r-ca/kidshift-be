import { Router } from 'express';
import Logger from '@src/logger';
import verifyToken from '../middlewares/verifyToken';

import authRouter from './authRouter';
import taskRouter from './taskRouter';
import accountRouter from './accountRouter';
import verifyParent from '../middlewares/verifyParent';

const router = Router();
const logger = new Logger();
logger.setTag('parent/index.ts');

router.use('/auth', authRouter);
router.use('/task', verifyToken, verifyParent, taskRouter);
router.use('/account', verifyToken, verifyParent, accountRouter);

export default router;
