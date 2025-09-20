/*
  Warnings:

  - Added the required column `cuicineType` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `glutenFree` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lactoseFree` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soyFree` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `cuicineType` ENUM('AMERICAN', 'ASIAN', 'BAKERY', 'BARBECUE', 'BURGER', 'CAFE', 'CHINESE', 'DESSERT', 'FAST_FOOD', 'FRENCH', 'INDIAN', 'ITALIAN', 'JAPANESE', 'KOREAN', 'MEXICAN', 'PIZZA', 'SEAFOOD', 'STEAKHOUSE', 'SUSHI', 'THAI', 'VEGETARIAN') NOT NULL,
    ADD COLUMN `glutenFree` BOOLEAN NOT NULL,
    ADD COLUMN `lactoseFree` BOOLEAN NOT NULL,
    ADD COLUMN `soyFree` BOOLEAN NOT NULL;
