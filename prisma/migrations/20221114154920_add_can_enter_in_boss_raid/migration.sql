/*
  Warnings:

  - Added the required column `canEnter` to the `BossRaid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BossRaid" ADD COLUMN     "canEnter" BOOLEAN NOT NULL;
