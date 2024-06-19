-- CreateTable
CREATE TABLE "ActiveLoginCode" (
    "id" TEXT NOT NULL,
    "child_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveLoginCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActiveLoginCode" ADD CONSTRAINT "ActiveLoginCode_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
