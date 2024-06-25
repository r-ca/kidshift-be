import { PrismaPromise, Task, TaskCompletion } from "@prisma/client";
import { TaskResponse, TaskListResponse, TaskAddRequest } from "@src/models/Task";
import prisma from "@src/prisma";

async function getTasks(homeGroupId: string): Promise<TaskListResponse> {
    return prisma.task.findMany({
        where: {
            home_group_id: {
                equals: homeGroupId
            },
        },
        select: {
            id: true,
            display_name: true,
            reward: true,
            TaskChildLinkage: {
                select: {
                    child_id: true,
                },
            },
        },
    }).then((result) => {
        const tasks: TaskResponse[] = result.map(task => ({
            id: task.id,
            name: task.display_name,
            reward: task.reward,
            attachedChlidren: task.TaskChildLinkage.map((linkage) => linkage.child_id),
        }));

        const response: TaskListResponse = {
            list: tasks as TaskResponse[]
        };

        return response;
    });

}

function getTasksByChild(childId: string): PrismaPromise<Task[]> {
    return prisma.task.findMany({
        where: {
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

function getTask(taskId: string): PrismaPromise<Task | null> {
    return prisma.task.findUnique({
        where: {
            id: taskId
        }
    });
}

// TODO: 同時にchildを正常にattach出来るようにする
function createTask(taskAddRequset: TaskAddRequest, homeGroupId: string): PrismaPromise<Task> {
    const task = { // TODO: 明示
        display_name: taskAddRequset.name,
        reward: taskAddRequset.reward,
        home_group_id: homeGroupId
    };

    return prisma.task.create({
        data: task
    });
}

function deleteTask(taskId: string): PrismaPromise<Task> {
    return prisma.task.delete({
        where: {
            id: taskId
        }
    });
}

// PUT
function updateTask(task: Task): PrismaPromise<Task> {
    return prisma.task.update({
        where: {
            id: task.id
        },
        data: task
    });
}

// 完了を登録
function registCompleteTask(taskId: string, childId: string): PrismaPromise<TaskCompletion> {
    return prisma.taskCompletion.create({
        data: {
            task_id: taskId,
            child_id: childId
        }
    });
}

export { getTask, getTasks, createTask, getTasksByChild, updateTask, deleteTask, registCompleteTask }
