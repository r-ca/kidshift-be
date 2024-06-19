import { User } from "@prisma/client";
import prisma from "@src/prisma";

async function updateUser(user: User): Promise<User> {
    return prisma.user.update({
        where: {
            id: user.id
        },
        data: user
    });
}

export { updateUser };
