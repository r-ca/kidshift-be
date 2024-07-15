import { Router } from 'express';
import Logger from '@src/logger';
import verifyToken from '../middlewares/verifyToken';
import verifyParent from '../middlewares/verifyParent';

import authRouter from './authRouter';
import accountRouter from './accountRouter';
import { commonRouter as rootCommonRouter, parentRouter as rootParentRouter } from './rootRouter';

const router = Router();
const logger = new Logger();
logger.setTag('parent/index.ts');

router.use('/auth', authRouter);
router.use('/account', verifyToken, verifyParent, accountRouter);
router.use('/', verifyToken, rootCommonRouter);
router.use('/', verifyToken, verifyParent, rootParentRouter);

export default router;
