import { TransactionLabels, TransactionsCategory } from '@prisma/client';

// ----------- Types
export namespace InputLabelType {
  export type GetLabel = {
    author: string;
  };

  export type NewLabel = {
    author: string;
    title: string;
    category: TransactionsCategory;
  };

  export type UpdateLabel = {
    labelId: string;
    author: string;
    title: string;
  };

  export type DeleteLabel = {
    author: string;
    labelId: string;
    mergeTo?: string;
  };
}

// ----------- Repositories
export interface ILabelRepository {
  get(input: InputLabelType.GetLabel): Promise<TransactionLabels[]>;
  create(input: InputLabelType.NewLabel): Promise<TransactionLabels>;
  update(input: InputLabelType.UpdateLabel): Promise<TransactionLabels>;
  delete(input: InputLabelType.DeleteLabel): Promise<void>;
  findById(id: string): Promise<TransactionLabels | null>;
}

// ----------- Services
export interface ILabelService {
  getLabel(input: InputLabelType.GetLabel): Promise<TransactionLabels[]>;
  newLabel(input: InputLabelType.NewLabel): Promise<TransactionLabels>;
  deleteLabel(input: InputLabelType.DeleteLabel): Promise<void>;
  updateLabel(input: InputLabelType.UpdateLabel): Promise<TransactionLabels>;
}
