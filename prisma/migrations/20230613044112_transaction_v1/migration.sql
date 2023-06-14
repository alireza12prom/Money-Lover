-- CreateEnum
CREATE TYPE "TransactionsCategory" AS ENUM ('EXPENSE', 'INCOME');

-- CreateTable
CREATE TABLE "Transactions" (
    "id" UUID NOT NULL,
    "walletId" UUID NOT NULL,
    "amount" DECIMAL(19,4) NOT NULL,
    "category" "TransactionsCategory" NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
