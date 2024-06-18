import { User } from '@prisma/client';
import prisma from '@src/prisma';

async function findUserById(userId: string): Promise<User> {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then(user => {
        if (!user) {
            throw new Error('ユーザーが見つかりません');
        }
        return user;
    });
}

export { findUserById };
