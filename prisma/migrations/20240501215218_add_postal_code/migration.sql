/*
  Warnings:

  - Added the required column `postal_code` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "postal_code" TEXT NOT NULL;
