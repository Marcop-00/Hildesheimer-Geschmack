/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Rating_restaurantId_userId_key` ON `Rating`(`restaurantId`, `userId`);
