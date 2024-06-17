/*
  Warnings:

  - You are about to drop the column `child_id` on the `Task` table. All the data in the column will be lost.
  - Added the required column `home_group_id` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_group_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_linked_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_child_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "home_group_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "child_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "home_group_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HomeGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HomeGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_home_group_id_fkey" FOREIGN KEY ("home_group_id") REFERENCES "HomeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_home_group_id_fkey" FOREIGN KEY ("home_group_id") REFERENCES "HomeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
