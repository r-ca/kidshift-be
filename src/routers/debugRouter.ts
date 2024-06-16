import { Router, Request, Response } from 'express';
import verifyToken from '@middlewares/verifyToken';
import { issueTokenByUserId } from '@src/utils/tokenUtils';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

router.post('/bypassAuth', (req: Request, res: Response) => {
    const userId = req.body.userId;
    const token = issueTokenByUserId(userId);
    res.json({ token });
});

router.get('/protected', verifyToken,(req: Request, res: Response) => {
    res.send('You are authorized to access this endpoint.');
});

router.post('/echo', (req: Request, res: Response) => {
    res.json(
    {
        message: req.body.message
    });
});

export default router;
