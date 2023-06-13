import { Currency, Wallets } from '@prisma/client';

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

// ----------- Repositories
export interface IWalletRepository {
  get(userId: string): Promise<Wallets[]>;
  create(input: NewWallet): Promise<Wallets>;
  delete(userId: string): Promise<Wallets | null>;
  update(input: Exclude<UpdateWallet, 'userId'>): Promise<Wallets | null>;
  findById(walletId: string): Promise<Wallets | null>;
  exists(userId: string, walletId: string): Promise<boolean>;
}

// ----------- Services
export interface IWalletService {
  newWallet(input: NewWallet): Promise<Wallets>;
  getWallets(userId: string): Promise<Wallets[]>;
  deleteWallet(input: DeleteWallet): Promise<void>;
  updateWallet(input: UpdateWallet): Promise<Wallets>;
}
