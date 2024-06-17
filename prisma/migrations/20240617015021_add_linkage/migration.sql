/*
  Warnings:

  - You are about to drop the column `user_id` on the `Task` table. All the data in the column will be lost.
  - Added the required column `home_group_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "user_id",
ADD COLUMN     "home_group_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TaskChildLinkage" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,

    CONSTRAINT "TaskChildLinkage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_home_group_id_fkey" FOREIGN KEY ("home_group_id") REFERENCES "HomeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskChildLinkage" ADD CONSTRAINT "TaskChildLinkage_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskChildLinkage" ADD CONSTRAINT "TaskChildLinkage_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
