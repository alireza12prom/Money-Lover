/*
  Warnings:

  - You are about to drop the column `category` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `labelId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "category",
ADD COLUMN     "labelId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "TransactionLabels" (
    "id" UUID NOT NULL,
    "author" UUID NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    "category" "TransactionsCategory" NOT NULL,

    CONSTRAINT "TransactionLabels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "TransactionLabels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionLabels" ADD CONSTRAINT "TransactionLabels_author_fkey" FOREIGN KEY ("author") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
