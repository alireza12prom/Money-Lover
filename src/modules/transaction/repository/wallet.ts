import { BaseRepository } from '../../../public/interface';
import { IWalletRepository } from '../interface';

export class WalletRepository extends BaseRepository implements IWalletRepository {
  async findById(walletId: string) {
    return await this.client.wallets.findUnique({ where: { id: walletId } });
  }
}
