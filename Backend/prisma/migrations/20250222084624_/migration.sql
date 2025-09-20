-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_userId_fkey`;

-- DropIndex
DROP INDEX `Feedback_userId_fkey` ON `Feedback`;
