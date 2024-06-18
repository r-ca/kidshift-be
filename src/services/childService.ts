import { Child } from '@prisma/client';
import prisma from '@src/prisma';

async function getChildList(homeGroupId: string): Promise<Child[]> {
    return prisma.child.findMany({
        where: {
            home_group_id: homeGroupId
        }
    }).then((children) => { return children; });
}


export { getChildList };
