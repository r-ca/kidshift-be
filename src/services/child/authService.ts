import prisma from '@src/prisma';
import { issueTokenByChildId } from '@src/utils/tokenUtils';

async function login(loginCode: string): Promise<string | null> {
    const childId: string | null = await prisma.activeLoginCode.findUnique({
        where: {
            code: parseInt(loginCode)
        }
            }).then((activeLoginCode) => {
        if (!activeLoginCode) {
            return null;
        }
        return activeLoginCode.child_id;
    });
    if (!childId) {
        return null;
    }
    await prisma.activeLoginCode.delete({
        where: {
            code: parseInt(loginCode)
        }
    });
    return await issueTokenByChildId(childId);
}

export { login };
