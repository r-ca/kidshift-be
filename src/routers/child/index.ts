import { Router } from 'express';

import authRouter from './authRouter';
import { commonRouter as rootCommonRouter, parentRouter as rootParentRouter } from './rootRouter';
import verifyToken from '../middlewares/verifyToken';
import verifyParent from '../middlewares/verifyParent';

const router = Router();

router.use('/auth', authRouter);
router.use('/' , verifyToken, rootCommonRouter);
router.use('/' , verifyToken, verifyParent, rootParentRouter);

export default router;
