import { PrismaPromise, Task } from "@prisma/client";
import prisma from "@src/prisma";

function getTasks(homeGroupId: string, childId?: string): PrismaPromise<Task[]> {
    return prisma.task.findMany({
        where: {
            home_group_id: {
                equals: homeGroupId
            },
            TaskChildLinkage: {
                some: {
                    child_id: {
                        equals: childId
                    }
                }
            }
        },
        include: {
            TaskChildLinkage: true
        }
    });
}

function createTask(task: Task): PrismaPromise<Task> {
    return prisma.task.create({ // TODO: Validate task
        data: task
    });
}

export { getTasks, createTask }
