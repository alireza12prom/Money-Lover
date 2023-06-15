import { TransactionLabels, Transactions, Wallets } from '@prisma/client';

// ----------- Types
export namespace InputTransType {
  export type GetTransactions = {
    userId: string;
    walletId: string;
    year: number;
    month: number;
    page: number;
    limit: number;
  };

  export type NewTransaction = {
    userId: string;
    walletId: string;
    labelId: string;
    amount: number;
    note: string;
  };

  export type UpdateTransaction = {
    userId: string;
    transId: string;
    labelId: string;
    amount?: number;
    note?: string;
  };

  export type DeleteTransaction = {
    userId: string;
    transId: string;
  };
}

export namespace InputTransRepoType {
  export type GetTransactions = {
    walletId: string;
    year: number;
    month: number;
    page: number;
    limit: number;
  };

  export type NewTransaction = {
    walletId: string;
    labelId: string;
    amount: number;
    note: string;
    label: TransactionLabels;
  };

  export type UpdateTransaction = {
    transId: string;
    amount?: number;
    note?: string;
    label?: TransactionLabels;
    transaction: Transactions & { label: TransactionLabels };
  };

  export type DeleteTransaction = Transactions & { label: TransactionLabels };
}

// ----------- Repositories
export interface ITransactionRepository {
  get(intpu: InputTransRepoType.GetTransactions): Promise<unknown>;
  create(input: InputTransRepoType.NewTransaction): Promise<Transactions>;
  update(input: InputTransRepoType.UpdateTransaction): Promise<Transactions>;
  delete(input: InputTransRepoType.DeleteTransaction): Promise<void>;
  findById(
    transId: string
  ): Promise<(Transactions & { label: TransactionLabels; wallet: Wallets }) | null>;
}

export interface IWalletRepository {
  findById(walletId: string): Promise<Wallets | null>;
}

export interface ILabelRepository {
  findById(id: string): Promise<TransactionLabels | null>;
}

// ----------- Services
export interface ITransactionService {
  getTransactions(input: InputTransType.GetTransactions): Promise<unknown>;
  newTransaction(input: InputTransType.NewTransaction): Promise<Transactions>;
  deleteTransaction(input: InputTransType.DeleteTransaction): Promise<void>;
  updateTransaction(input: InputTransType.UpdateTransaction): Promise<Transactions>;
}
