-- CreateTable
CREATE TABLE "ActiveParentLoginCode" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveParentLoginCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveParentLoginCode_code_key" ON "ActiveParentLoginCode"("code");

-- AddForeignKey
ALTER TABLE "ActiveParentLoginCode" ADD CONSTRAINT "ActiveParentLoginCode_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
