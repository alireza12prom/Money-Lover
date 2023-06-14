import { BaseRepository } from '../../../public/interface';
import { IWalletRepository, InputRepositoryType } from '../interface';

export class WalletRepository extends BaseRepository implements IWalletRepository {
  async get(input: InputRepositoryType.GetWallet) {
    return await this.client.wallets.findMany({
      where: { userId: input.userId }
    });
  }

  async create(input: InputRepositoryType.NewWallet) {
    return await this.client.wallets.create({ data: input });
  }

  async delete(walletId: string) {
    return await this.client.wallets.delete({
      where: { id: walletId }
    });
  }

  async update(input: InputRepositoryType.UpdateWallet) {
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
