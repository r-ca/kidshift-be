import { Router, Request, Response } from 'express';
import verifyToken from '@middlewares/verifyToken';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

router.get('/protected', verifyToken,(req: Request, res: Response) => {
    res.send('You are authorized to access this endpoint');
});

router.post('/echo', (req: Request, res: Response) => {
    res.json(
    {
        message: req.body.message
    });
});

export default router;
