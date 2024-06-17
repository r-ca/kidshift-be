import prisma from "@src/prisma";
import bcrypt from "bcrypt";
import { issueTokenByUserId } from "@src/utils/tokenUtils";
import { createHomeGroup } from "@src/services/homeGroupService";

async function registUser(email: string, password: string, homeGroupId?: string): Promise<String> {
    
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!homeGroupId) {
        homeGroupId = await createHomeGroup(email).then((homeGroup) => { return homeGroup.id });
    }

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
    if(!user) {
        return null;
    }
    if(bcrypt.compareSync(password, user.password)) {
        return issueTokenByUserId(user.id);
    } else {
        return null;
    }
}


export { registUser, loginUser };
