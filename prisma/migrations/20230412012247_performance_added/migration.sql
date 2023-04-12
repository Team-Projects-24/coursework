-- AlterTable
ALTER TABLE `Team` ADD COLUMN `leaderId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `PerformanceLog` (
    `userId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `manHoursSet` DOUBLE NOT NULL,
    `manHoursCompleted` DOUBLE NOT NULL,

    PRIMARY KEY (`userId`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_leaderId_fkey` FOREIGN KEY (`leaderId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
