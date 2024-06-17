import { Router, Request, Response } from 'express';
import { getCommitHash, getBranchName, getCommitDate, getCommitMessage } from '@src/utils/gitMeta';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

router.get('/' , (req: Request, res: Response) => {
    res.json({
        "commitHash": getCommitHash(),
        "branchName": getBranchName(),
        "commitDate": getCommitDate(),
        "commitMessage": getCommitMessage()
    });
});

export default router;
