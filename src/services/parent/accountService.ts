import { User } from "@prisma/client";
import prisma from "@src/prisma";
import Logger from "@src/logger";

const logger = new Logger();
logger.setTag('AccountService');

async function updateUser(user: User): Promise<User> {
    return prisma.user.update({
        where: {
            id: user.id
        },
        data: user
    });
}

async function generateParentLoginCode(parentId: string): Promise<number> {
    const loginCode: number = Math.floor(Math.random() * 10000);
    logger.debug(`Generated login code: ${loginCode}`);
    // cron.schedule('0 0 * * *', () => {
    //     prisma.activeLoginCode.delete({
    //         where: {
    //             code: loginCode
    //         }
    //     });
    // });
    return prisma.activeParentLoginCode.create({
        data: {
            parent_id: parentId,
            code: loginCode
        }
    }).then((code) => {
        logger.success(`Login code ${code.code} is generated for parent ${parentId}`);
        return code.code;
    });
}

export { updateUser, generateParentLoginCode };
