import { BadRequest, NotFound } from '../../errors';
import { BaseLogRepository } from '../../public/repository';
import { ValidatorService } from '../../public/service';

import { IWalletRepository, IWalletService, InputServiceType } from './interface';
import { DeleteWalletSchema, NewWalletSchema, UpdateWalletSchema } from './schema';

export class WalletService implements IWalletService {
  constructor(
    private readonly _walletRepo: IWalletRepository,
    private readonly _logRepo: BaseLogRepository
  ) {}

  async getWallets(input: InputServiceType.GetWallet) {
    return await this._walletRepo.get(input);
  }

  async newWallet(input: InputServiceType.NewWallet) {
    // validate input
    const validate = new ValidatorService<InputServiceType.NewWallet>(input).validate(
      NewWalletSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // logging
    process.nextTick(async () => {
      await this._logRepo.create('NewWallet', input.userId);
    });

    // create new wallet
    return await this._walletRepo.create(input);
  }

  async deleteWallet(input: InputServiceType.DeleteWallet) {
    // validate input
    const validate = new ValidatorService<InputServiceType.DeleteWallet>(input).validate(
      DeleteWalletSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check wallet exists
    if (!(await this._walletRepo.exists(input.userId, input.walletId))) {
      throw new NotFound('wallet not found');
    }

    // delete target wallet
    if (!(await this._walletRepo.delete(input.walletId))) {
      throw new NotFound('wallet not found');
    }

    // logging
    process.nextTick(async () => {
      await this._logRepo.create('MissedWallet', input.userId);
    });
  }

  async updateWallet(input: InputServiceType.UpdateWallet) {
    // validate input
    const validate = new ValidatorService<InputServiceType.UpdateWallet>(input).validate(
      UpdateWalletSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // client must specify at least one field to update
    if (Object.values(input).filter((v) => v != undefined).length == 2) {
      throw new BadRequest('you have to specify at least one field');
    }

    // check wallet exists
    if (!(await this._walletRepo.exists(input.userId, input.walletId))) {
      throw new NotFound('wallet not found');
    }

    // update wallet
    const updatedWallet = await this._walletRepo.update(input);
    if (!updatedWallet) {
      throw new NotFound('wallet not found');
    }

    return updatedWallet;
  }
}
