/*
  Warnings:

  - The primary key for the `PerformanceLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `PerformanceLog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PerformanceLog` DROP FOREIGN KEY `PerformanceLog_userId_fkey`;

-- AlterTable
ALTER TABLE `PerformanceLog` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    ADD PRIMARY KEY (`taskId`, `date`);
