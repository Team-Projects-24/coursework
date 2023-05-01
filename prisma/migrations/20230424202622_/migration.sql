/*
  Warnings:

  - You are about to drop the `ChatInvite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ChatInvite` DROP FOREIGN KEY `ChatInvite_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `ChatInvite` DROP FOREIGN KEY `ChatInvite_userId_fkey`;

-- DropTable
DROP TABLE `ChatInvite`;
