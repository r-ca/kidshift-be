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

async function updateParentName(userId: string, name: string): Promise<User> {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            display_name: name
        }
    }).then(user => {
        return user;
    });
}

export { findUserById, findChildById, updateParentName };
