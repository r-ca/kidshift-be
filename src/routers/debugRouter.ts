import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

router.post('/echo', (req: Request, res: Response) => {
    res.json(
    {
        message: req.body.message
    });
});

export default router;
