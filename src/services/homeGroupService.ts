import { HomeGroup, PrismaPromise } from "@prisma/client";
import prisma from "@src/prisma";

function createHomeGroup(name: string): PrismaPromise<HomeGroup> {
    return prisma.homeGroup.create({
        data: {
            name
        }
    });
}

export { createHomeGroup };
