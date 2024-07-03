import { Router } from 'express';
import { commonRouter, parentRouter } from './rootRouter';

const router = Router();

router.use('/', commonRouter);
router.use('/' , parentRouter);

export default router;



