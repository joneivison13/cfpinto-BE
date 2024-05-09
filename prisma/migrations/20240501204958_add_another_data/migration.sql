/*
  Warnings:

  - Added the required column `expDate` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expedit` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `civil_state` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natural_city` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natural_country` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natural_state` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profession` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "expDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expedit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "civil_state" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "natural_city" TEXT NOT NULL,
ADD COLUMN     "natural_country" TEXT NOT NULL,
ADD COLUMN     "natural_state" TEXT NOT NULL,
ADD COLUMN     "profession" TEXT NOT NULL;
