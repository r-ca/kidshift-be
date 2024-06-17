import { Router, Request, Response } from 'express';
import { getCommitHash, getBranchName, getCommitDate, getCommitMessage } from '@src/utils/gitMeta';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

router.get('/' , async (req: Request, res: Response) => {
    res.json({
        "commitHash": await getCommitHash(),
        "branchName": await getBranchName(),
        "commitDate": await getCommitDate(),
        "commitMessage": await getCommitMessage()
    });
});

export default router;
