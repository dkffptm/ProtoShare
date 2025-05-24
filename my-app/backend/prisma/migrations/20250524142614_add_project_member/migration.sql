/*
  Warnings:

  - You are about to drop the column `userEmail` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `projectmember` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[projectId,userId]` on the table `ProjectMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ProjectMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_userEmail_fkey`;

-- DropForeignKey
ALTER TABLE `projectmember` DROP FOREIGN KEY `ProjectMember_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectmember` DROP FOREIGN KEY `ProjectMember_userEmail_fkey`;

-- DropIndex
DROP INDEX `Project_userEmail_fkey` ON `project`;

-- DropIndex
DROP INDEX `ProjectMember_projectId_userEmail_key` ON `projectmember`;

-- DropIndex
DROP INDEX `ProjectMember_userEmail_fkey` ON `projectmember`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `userEmail`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `projectmember` DROP COLUMN `userEmail`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `ProjectMember_projectId_userId_key` ON `ProjectMember`(`projectId`, `userId`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectMember` ADD CONSTRAINT `ProjectMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
