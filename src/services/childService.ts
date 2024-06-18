import { Child } from '@prisma/client';
import prisma from '@src/prisma';

async function getChilds(homeGroupId: string): Promise<Child[]> {
    return prisma.child.findMany({
        where: {
            home_group_id: homeGroupId
        }
    }).then((children) => { return children; });
}

async function createChild(childName: string, homeGroupId: string): Promise<Child> {
    const child: Child = {} as Child;
    child.name = childName;
    child.home_group_id = homeGroupId;
    return prisma.child.create({
        data: child
    }).then((child) => { return child; });
}

export { getChilds, createChild };
