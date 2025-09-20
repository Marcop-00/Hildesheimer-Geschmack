/*
  Warnings:

  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_userId_fkey`;

-- DropIndex
DROP INDEX `Feedback_userId_fkey` ON `Feedback`;

-- AlterTable
ALTER TABLE `Feedback` DROP COLUMN `userId`;
