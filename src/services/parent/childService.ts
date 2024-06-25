import { Child, ActiveLoginCode } from '@prisma/client';
import prisma from '@src/prisma';
import { ChildAddRequest, ChildListResponse, ChildResponse } from '@src/models/Child';
import cron from 'node-cron';
import Logger from '@src/logger';

const logger = new Logger();
logger.setTag('ChildService');

async function getChilds(homeGroupId: string): Promise<ChildListResponse> {
    return prisma.child.findMany({
        where: {
            home_group_id: homeGroupId
        }
    }).then((children) => {
        const childList: ChildResponse[] = children.map((child) => ({
            id: child.id,
            name: child.name
        }));

        const response: ChildListResponse = {
            list: childList
        };

        return response;
    });
}

async function createChild(requestBody: ChildAddRequest, homeGroupId: string): Promise<Child> {
    const child: Child = {} as Child;
    child.name = requestBody.name;
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

async function generateLoginCode(childId: string): Promise<number> {
    const loginCode: number = Math.floor(10000000 + Math.random() * 90000000);
    logger.debug(`Generated login code: ${loginCode}`);
    // cron.schedule('0 0 * * *', () => {
    //     prisma.activeLoginCode.delete({
    //         where: {
    //             code: loginCode
    //         }
    //     });
    // });
    return prisma.activeLoginCode.create({
        data: {
            child_id: childId,
            code: loginCode
        }
    }).then((code) => {
        logger.success(`Login code ${code.code} is generated for child ${childId}`);
        return code.code;
    });
}

export { getChilds, createChild, deleteChild, generateLoginCode }
