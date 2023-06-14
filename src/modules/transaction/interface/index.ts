import {
  TransactionLabels,
  Transactions,
  Wallets,
  TransactionsCategory
} from '@prisma/client';

export namespace InputTransactionType {
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

  export type NewTransactionLabel = {
    author: string;
    title: string;
    category: TransactionsCategory;
  };

  export type GetTransactionLabel = {
    author: string;
  };

  export type UpdateTransactionLabel = {
    labelId: string;
    author: string;
    title: string;
  };

  export type DeleteTransactionLabel = {
    author: string;
    labelId: string;
    mergeTo?: string;
  };
}

export namespace InputTransactionRepositoryType {
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
    labelId: string;
    amount?: number;
    note?: string;
    label?: TransactionLabels;
    transaction: Transactions & { label: TransactionLabels };
  };

  export type DeleteTransaction = Transactions & { label: TransactionLabels };
}

export namespace InputTransactionLabelRepositoryType {
  export type NewTransactionLabel = {
    author: string;
    title: string;
    category: TransactionsCategory;
  };

  export type GetTransactionLabel = {
    author: string;
  };

  export type UpdateTransactionLabel = {
    labelId: string;
    author: string;
    title: string;
  };

  export type DeleteTransactionLabel = {
    author: string;
    labelId: string;
    mergeTo?: string;
  };
}

// ----------- Repositories
export interface ITransactionRepository {
  get(intpu: InputTransactionRepositoryType.GetTransactions): Promise<unknown>;
  create(input: InputTransactionRepositoryType.NewTransaction): Promise<Transactions>;
  update(input: InputTransactionRepositoryType.UpdateTransaction): Promise<Transactions>;
  delete(input: InputTransactionRepositoryType.DeleteTransaction): Promise<void>;
  findById(
    transId: string
  ): Promise<(Transactions & { label: TransactionLabels; wallet: Wallets }) | null>;
}

export interface IWalletRepository {
  findById(walletId: string): Promise<Wallets | null>;
}

export interface ITransactionLabelRepository {
  get(
    input: InputTransactionLabelRepositoryType.GetTransactionLabel
  ): Promise<TransactionLabels[]>;

  create(
    input: InputTransactionLabelRepositoryType.NewTransactionLabel
  ): Promise<TransactionLabels>;

  update(
    input: InputTransactionLabelRepositoryType.UpdateTransactionLabel
  ): Promise<TransactionLabels>;

  delete(
    input: InputTransactionLabelRepositoryType.DeleteTransactionLabel
  ): Promise<void>;

  findById(id: string): Promise<TransactionLabels | null>;
}

// ----------- Services
export interface ITransactionService {
  getTransactions(input: InputTransactionType.GetTransactions): Promise<unknown>;
  newTransaction(input: InputTransactionType.NewTransaction): Promise<Transactions>;
  deleteTransaction(input: InputTransactionType.DeleteTransaction): Promise<void>;
  updateTransaction(input: InputTransactionType.UpdateTransaction): Promise<Transactions>;

  getLabel(input: InputTransactionType.GetTransactionLabel): Promise<TransactionLabels[]>;
  newLabel(input: InputTransactionType.NewTransactionLabel): Promise<TransactionLabels>;
  deleteLabel(input: InputTransactionType.DeleteTransactionLabel): Promise<void>;
  updateLabel(
    input: InputTransactionType.UpdateTransactionLabel
  ): Promise<TransactionLabels>;
}
