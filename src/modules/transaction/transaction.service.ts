import { BadRequest, NotFound } from '../../errors';
import { ValidatorService } from '../../public/service';

import {
  DeleteTransactionSchema,
  GetTransactionSchema,
  NewTransactionSchema,
  UpdateTransactionSchema
} from './schema';

import {
  ILabelRepository,
  InputTransType,
  ITransactionRepository,
  ITransactionService,
  IWalletRepository
} from './interface';

export class TransactionService implements ITransactionService {
  constructor(
    private readonly _transRepo: ITransactionRepository,
    private readonly _walletRepo: IWalletRepository,
    private readonly _labelRepo: ILabelRepository
  ) {}

  async newTransaction(input: InputTransType.NewTransaction) {
    // validate input
    const validate = new ValidatorService<InputTransType.NewTransaction>(input).validate(
      NewTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._labelRepo.findById(input.labelId);
    if (!label || label.author != input.userId) {
      throw new NotFound('label not found');
    }

    // check wallet exists
    const wallet = await this._walletRepo.findById(input.walletId);
    if (!wallet || wallet.userId != input.userId) {
      throw new NotFound('wallet not found');
    }

    // transaction is not valid if freeze mode was active
    if (wallet.freeze) {
      throw new BadRequest('your wallet is freezad');
    }

    // create new transaction
    return await this._transRepo.create({ ...input, label });
  }

  async getTransactions(input: InputTransType.GetTransactions) {
    // validate input
    const validate = new ValidatorService<InputTransType.GetTransactions>(input).validate(
      GetTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check wallet exists
    const wallet = await this._walletRepo.findById(input.walletId);
    if (!wallet || wallet.userId != input.userId) {
      throw new NotFound('wallet not found');
    }

    // return available transactions
    return await this._transRepo.get(input);
  }

  async updateTransaction(input: InputTransType.UpdateTransaction) {
    // validate input
    const validate = new ValidatorService<InputTransType.UpdateTransaction>(
      input
    ).validate(UpdateTransactionSchema);
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check transaction exists
    const transaction = await this._transRepo.findById(input.transId);
    if (!transaction || transaction.wallet.userId != input.userId) {
      throw new NotFound('transaction not found');
    }

    // check label exists (if specifyed)
    let label = undefined;
    if (input.labelId) {
      label = await this._labelRepo.findById(input.labelId);
      if (!label || label.author != input.userId) {
        throw new NotFound('label not found');
      }
    }

    // update transaction
    return await this._transRepo.update({ ...input, label, transaction });
  }

  async deleteTransaction(input: InputTransType.DeleteTransaction) {
    // validate input
    const validate = new ValidatorService<InputTransType.DeleteTransaction>(
      input
    ).validate(DeleteTransactionSchema);
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check transaction exists
    const transaction = await this._transRepo.findById(input.transId);
    if (!transaction || transaction.wallet.userId != input.userId) {
      throw new NotFound('transaction not found');
    }

    // delete transaction
    await this._transRepo.delete(transaction);
  }
}
