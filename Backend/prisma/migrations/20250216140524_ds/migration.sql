/*
  Warnings:

  - You are about to drop the column `cuicineType` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `cuisineType` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Restaurant` DROP COLUMN `cuicineType`,
    ADD COLUMN `cuisineType` ENUM('AMERICAN', 'ASIAN', 'BAKERY', 'BARBECUE', 'BURGER', 'CAFE', 'CHINESE', 'DESSERT', 'FAST_FOOD', 'FRENCH', 'INDIAN', 'ITALIAN', 'JAPANESE', 'KOREAN', 'MEXICAN', 'PIZZA', 'SEAFOOD', 'STEAKHOUSE', 'SUSHI', 'THAI', 'VEGETARIAN') NOT NULL;
