import { Prisma, PrismaClient, User } from "@prisma/client";
import prisma from "@src/prisma";


function registUser(email: string, password: string): Promise<String> {
    
    const registUser = prisma.user.create({ // TODO: バリデーション, ハッシュ化, その他
        data: {
            email,
            password,
            name: email,
        }
    });

    return registUser.then((user) => {
        return user.id
    });
}


export { registUser };
