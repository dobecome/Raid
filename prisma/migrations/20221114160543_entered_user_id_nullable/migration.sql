-- DropForeignKey
ALTER TABLE "BossRaid" DROP CONSTRAINT "BossRaid_enteredUserId_fkey";

-- AlterTable
ALTER TABLE "BossRaid" ALTER COLUMN "enteredUserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BossRaid" ADD CONSTRAINT "BossRaid_enteredUserId_fkey" FOREIGN KEY ("enteredUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
