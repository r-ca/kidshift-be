import { PrismaPromise, Task } from "@prisma/client";
import prisma from "@src/prisma";

function getTasksByUserId(userId: string): PrismaPromise<Task[]> {
    return prisma.task.findMany({
        where: {
            user_id: {
                equals: userId,
            }
        }
    });
}

function getTasksByChildId(childId: string): PrismaPromise<Task[]> {
    return prisma.task.findMany({
        where: {
            child_id: {
                equals: childId,
            }
        }
    });
}

export { getTasksByUserId, getTasksByChildId };
