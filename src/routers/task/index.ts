import { Router } from 'express';
import { commonRouter as rootCommonRouter, parentRouter as rootParentRouter } from './rootRouter';
import { commonRouter as historyCommonRouter, parentRouter as historyParentRouter } from './historyRouter';
import verifyToken from '../middlewares/verifyToken';
import verifyParent from '../middlewares/verifyParent';

const router = Router();

router.use('/', verifyToken, rootCommonRouter);
router.use('/' , verifyToken, rootParentRouter);
router.use('/history', verifyToken, historyCommonRouter);
router.use('/history', verifyToken, historyParentRouter);

export default router;



