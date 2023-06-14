import {
  TransactionLabels,
  Transactions,
  Wallets,
  TransactionsCategory
} from '@prisma/client';

// ----------- service inputs
// transaction
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

// label
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

export type TransactionLabel = Transactions & { label: TransactionLabel };

// ----------- input/output types
export namespace TransInputsRepo {
  export type Get = Omit<GetTransactions, 'userId'>;
  export type Create = Omit<NewTransaction, 'userId'> & { label: TransactionLabels };
  export type Delete = Transactions & { label: TransactionLabels };
  export type Update = Omit<UpdateTransaction, 'userId'> & {
    label?: TransactionLabels;
    transaction: Transactions & { label: TransactionLabels };
  };
}

export namespace TransOutputRepo {
  export type Get = Transactions[] & { label?: TransactionLabels };
  export type FindById =
    | (Transactions & { label: TransactionLabels; wallet: Wallets })
    | null;
}

// ----------- Repositories
export interface ITransactionRepository {
  get(intpu: TransInputsRepo.Get): Promise<unknown>;
  create(input: TransInputsRepo.Create): Promise<Transactions>;
  update(input: TransInputsRepo.Update): Promise<Transactions>;
  delete(input: TransInputsRepo.Delete): Promise<void>;
  findById(transId: string): Promise<TransOutputRepo.FindById>;
}

export interface IWalletRepository {
  findById(walletId: string): Promise<Wallets | null>;
}

export interface ITransactionLabelRepository {
  get(input: GetTransactionLabel): Promise<TransactionLabels[]>;
  create(input: NewTransactionLabel): Promise<TransactionLabels>;
  update(input: UpdateTransactionLabel): Promise<TransactionLabels>;
  delete(input: DeleteTransactionLabel): Promise<void>;
  findById(id: string): Promise<TransactionLabels | null>;
}

// ----------- Services
export interface ITransactionService {
  getTransactions(input: GetTransactions): Promise<unknown>;
  newTransaction(input: NewTransaction): Promise<Transactions>;
  updateTransaction(input: UpdateTransaction): Promise<Transactions>;
  deleteTransaction(input: DeleteTransaction): Promise<void>;

  getLabel(input: GetTransactionLabel): Promise<TransactionLabels[]>;
  newLabel(input: NewTransactionLabel): Promise<TransactionLabels>;
  updateLabel(input: UpdateTransactionLabel): Promise<TransactionLabels>;
  deleteLabel(input: DeleteTransactionLabel): Promise<void>;
}
