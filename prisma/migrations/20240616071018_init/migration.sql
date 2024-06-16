-- CreateTable
CREATE TABLE "User" (
    "internal_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("internal_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
