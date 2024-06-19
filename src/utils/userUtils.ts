import { Child, User } from '@prisma/client';
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

async function findChildById(childId: string): Promise<Child> {
    return await prisma.child.findUnique({
        where: {
            id: childId
        }
    }).then(child => {
        if (!child) {
            throw new Error('ユーザーが見つかりません');
        }
        return child;
    });
}

export { findUserById, findChildById }
