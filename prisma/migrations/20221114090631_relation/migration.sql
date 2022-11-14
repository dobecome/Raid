/*
  Warnings:

  - You are about to drop the `boss-raids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bossRaidId` to the `BossRaidRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BossRaidRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BossRaidRecord" ADD COLUMN     "bossRaidId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "boss-raids";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalScore" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BossRaid" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enteredUserId" INTEGER NOT NULL,

    CONSTRAINT "BossRaid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BossRaid" ADD CONSTRAINT "BossRaid_enteredUserId_fkey" FOREIGN KEY ("enteredUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BossRaidRecord" ADD CONSTRAINT "BossRaidRecord_bossRaidId_fkey" FOREIGN KEY ("bossRaidId") REFERENCES "BossRaid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BossRaidRecord" ADD CONSTRAINT "BossRaidRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
