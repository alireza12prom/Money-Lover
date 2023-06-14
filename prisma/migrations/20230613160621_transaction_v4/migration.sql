/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TransactionLabels` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TransactionLabels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TransactionLabels" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
