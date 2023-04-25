/*
  Warnings:

  - The primary key for the `PerformanceLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserOnTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ChatInvite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `PerformanceLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ChatInvite` DROP FOREIGN KEY `ChatInvite_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `ChatInvite` DROP FOREIGN KEY `ChatInvite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserOnTeam` DROP FOREIGN KEY `UserOnTeam_teamId_fkey`;

-- AlterTable
ALTER TABLE `PerformanceLog` DROP PRIMARY KEY,
    ADD COLUMN `taskId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `taskId`, `date`);

-- AlterTable
ALTER TABLE `Team` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserOnTeam` DROP PRIMARY KEY,
    MODIFY `teamId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `teamId`);

-- DropTable
DROP TABLE `ChatInvite`;

-- CreateTable
CREATE TABLE `Task` (
    `taskId` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `manHoursCompleted` DOUBLE NOT NULL,
    `manHoursSet` DOUBLE NOT NULL,

    PRIMARY KEY (`taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Team_id_key` ON `Team`(`id`);

-- AddForeignKey
ALTER TABLE `UserOnTeam` ADD CONSTRAINT `UserOnTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerformanceLog` ADD CONSTRAINT `PerformanceLog_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`taskId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
