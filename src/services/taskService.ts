import prisma from "@src/prisma";

function getTasksByUserId(userId: string) {
    return prisma.task.findMany({
        where: {
            user_id: {
                equals: userId,
            }
        }
    });
}

function getTasksByChildId(childId: string) {
    return prisma.task.findMany({
        where: {
            child_id: {
                equals: childId,
            }
        }
    });
}
