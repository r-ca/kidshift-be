import { Router, Request, Response } from 'express';
import { registUser, loginUser } from '@src/services/authService'; 

const router = Router();

router.post('/register', (req: Request, res: Response) => {
    const { email, password } = req.body;
    registUser(email, password)
        .then((user) => { // トークンとかを返すべき
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    loginUser(email, password)
        .then((user) => { // トークンとかを返すべき
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

export default router;
