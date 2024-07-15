import prisma from "@src/prisma";
import bcrypt from "bcryptjs";
import { issueTokenByUserId } from "@src/utils/tokenUtils";
import { createHomeGroup } from "@src/services/homeGroupService";
import Logger from "@src/logger";
import { TokenResponse } from "@src/models/Token";

const logger = new Logger();
logger.setTag('authService');

async function registUser(email: string, password: string, homeGroupId?: string): Promise<String> {

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!homeGroupId) { // TODO: 作成失敗したときにHomeGroupだけ残るのを防ぐ
        logger.info("HomeGroup is not specified, creating new HomeGroup");
        await createHomeGroup(email).then((homeGroup) => { return homeGroup.id })
            .then((id) => {
                if (!id) {
                    logger.error("Create HomeGroup failed, id is undefined")
                    throw new Error("Create HomeGroup failed");
                }
                logger.info("Create HomeGroup success");
                logger.debug(`HomeGroupId: ${id}`);
                homeGroupId = id;
            }).catch((e) => {
                logger.error("Create HomeGroup failed");
                logger.debug(e.message);
            });
    }

    homeGroupId = homeGroupId as string; // ここに到達している時点でundefinedにはならないため

    const registUser = prisma.user.create({ // TODO: emailバリデーション
        data: {
            email,
            password: hashedPassword,
            display_name: email,
            home_group_id: homeGroupId
        }
    });

    const user = await registUser;
    return issueTokenByUserId(user.id);
}

async function loginUser(email: string, password: string): Promise<String | null> {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return null;
    }
    if (bcrypt.compareSync(password, user.password)) {
        return issueTokenByUserId(user.id);
    } else {
        return null;
    }
}

async function loginUserWithCode(code: string): Promise<String | null> {
    const parentUser = await prisma.activeParentLoginCode.findUnique({
        where: {
            code: parseInt(code)
        }
    });
    if (!parentUser) {
        return null;
    }
    return issueTokenByUserId(parentUser.parent_id);
}





export { registUser, loginUser, loginUserWithCode }
