import { Router } from 'express';
import { commonRouter, parentRouter } from './rootRouter';
import verifyToken from '../middlewares/verifyToken';
import verifyParent from '../middlewares/verifyParent';

const router = Router();

router.use('/', verifyToken, commonRouter);
router.use('/' , verifyToken, verifyParent, parentRouter);

export default router;



