import { HistoryResponse } from "@src/models/History";
import prisma from "@src/prisma";

async function getHistories(childId: string, containPaid: boolean): Promise<HistoryResponse[]> {
    return prisma.taskCompletion.findMany({
        where: {
            child_id: childId,
        },
    }).then((histories) => {
        if (!histories) {
            return [];
        }
        return histories.map((history) => {
            return {
                id: history.id,
                childId: history.child_id,
                taskId: history.task_id,
                registeredAt: history.registerd_at
            };
        });
    });
}

export { getHistories };
