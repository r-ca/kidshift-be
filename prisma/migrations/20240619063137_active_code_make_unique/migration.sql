/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `ActiveLoginCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActiveLoginCode_code_key" ON "ActiveLoginCode"("code");
