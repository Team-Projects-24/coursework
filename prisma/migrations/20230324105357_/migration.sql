/*
  Warnings:

  - You are about to drop the column `chatGroupId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `chatroomId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatGroupId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatGroupId",
ADD COLUMN     "chatroomId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
