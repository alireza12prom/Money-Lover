import { Currency, Wallets } from '@prisma/client';

export namespace InputServiceType {
  export type GetWallet = {
    userId: string;
  };

  export type NewWallet = {
    userId: string;
    name: string;
    balance: number;
    currency: Currency;
  };

  export type DeleteWallet = {
    userId: string;
    walletId: string;
  };

  export type UpdateWallet = {
    userId: string;
    walletId: string;
    name?: string;
    balance?: number;
    freeze?: boolean;
    currency?: Currency;
  };
}

export namespace InputRepositoryType {
  export type GetWallet = {
    userId: string;
  };

  export type NewWallet = {
    userId: string;
    name: string;
    balance: number;
    currency: Currency;
  };

  export type UpdateWallet = {
    walletId: string;
    name?: string;
    balance?: number;
    freeze?: boolean;
    currency?: Currency;
  };
}

// ----------- Repositories
export interface IWalletRepository {
  get(user: InputRepositoryType.GetWallet): Promise<Wallets[]>;
  create(input: InputRepositoryType.NewWallet): Promise<Wallets>;
  delete(userId: string): Promise<Wallets | null>;
  update(input: InputRepositoryType.UpdateWallet): Promise<Wallets | null>;
  findById(walletId: string): Promise<Wallets | null>;
  exists(userId: string, walletId: string): Promise<boolean>;
}

// ----------- Services
export interface IWalletService {
  newWallet(input: InputServiceType.NewWallet): Promise<Wallets>;
  getWallets(user: InputServiceType.GetWallet): Promise<Wallets[]>;
  deleteWallet(input: InputServiceType.DeleteWallet): Promise<void>;
  updateWallet(input: InputServiceType.UpdateWallet): Promise<Wallets>;
}
