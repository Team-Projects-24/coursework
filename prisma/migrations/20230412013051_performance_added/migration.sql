/*
  Warnings:

  - Made the column `leaderId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_leaderId_fkey`;

-- AlterTable
ALTER TABLE `Team` MODIFY `leaderId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_leaderId_fkey` FOREIGN KEY (`leaderId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
