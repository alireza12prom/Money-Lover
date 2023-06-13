import { BaseRepository } from '../../../public/interface';
import { IWalletRepository, NewWallet, UpdateWallet } from '../interface';

export class WalletRepository extends BaseRepository implements IWalletRepository {
  async create(input: NewWallet) {
    return await this.client.wallets.create({ data: input });
  }

  async get(userId: string) {
    return await this.client.wallets.findMany({
      where: { userId }
    });
  }

  async delete(walletId: string) {
    return await this.client.wallets.delete({
      where: { id: walletId }
    });
  }

  async update(input: UpdateWallet) {
    return await this.client.wallets.update({
      where: { id: input.walletId },
      data: {
        name: input.name,
        balance: input.balance,
        freeze: input.freeze,
        currency: input.currency
      }
    });
  }

  async findById(walletId: string) {
    return await this.client.wallets.findUnique({ where: { id: walletId } });
  }

  async exists(userId: string, walletId: string) {
    const target = await this.client.wallets.findFirst({
      where: { id: walletId, userId }
    });

    return target ? true : false;
  }
}
