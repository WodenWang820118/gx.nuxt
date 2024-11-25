/*
  Warnings:

  - Added the required column `user_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;
