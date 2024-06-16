import { Prisma, PrismaClient, User } from "@prisma/client";
import prisma from "@src/prisma";
import bcrypt from "bcrypt";
import { issueTokenByUserId } from "@src/utils/tokenUtils";

async function registUser(email: string, password: string): Promise<String> {
    
    const hashedPassword = bcrypt.hashSync(password, 10);

    const registUser = prisma.user.create({ // TODO: バリデーション, ハッシュ化, その他
        data: {
            email,
            password: hashedPassword,
            name: email,
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
