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

async function deleteChild(childId: string): Promise<Child> {
    return prisma.child.delete({
        where: {
            id: childId
        }
    }).then((child) => { return child; });
}

async function generateLoginCode(childId: string): Promise<string> {
    // 仮置き
    return Promise.resolve("123456");
}

export { getChilds, createChild, deleteChild, generateLoginCode }
