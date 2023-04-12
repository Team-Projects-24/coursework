-- AddForeignKey
ALTER TABLE `PerformanceLog` ADD CONSTRAINT `PerformanceLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
