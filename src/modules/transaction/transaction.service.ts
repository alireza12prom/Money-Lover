import { BadRequest, NotFound } from '../../errors';
import { ValidatorService } from '../../public/service';

import {
  DeleteTransactionSchema,
  GetTransactionSchema,
  NewTransactionSchema,
  UpdateTransactionSchema,
  NewTransactionLabelSchema
} from './schema';

import {
  DeleteTransaction,
  DeleteTransactionLabel,
  GetTransactionLabel,
  GetTransactions,
  ITransactionLabelRepository,
  ITransactionRepository,
  ITransactionService,
  IWalletRepository,
  NewTransaction,
  NewTransactionLabel,
  TransInputsRepo,
  UpdateTransaction,
  UpdateTransactionLabel
} from './interface';

export class TransactionService implements ITransactionService {
  constructor(
    private readonly _transRepo: ITransactionRepository,
    private readonly _walletRepo: IWalletRepository,
    private readonly _transLabelRepo: ITransactionLabelRepository
  ) {}

  async newTransaction(input: NewTransaction) {
    // validate input
    const validate = new ValidatorService<NewTransaction>(input).validate(
      NewTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._transLabelRepo.findById(input.labelId);
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

  async getTransactions(input: GetTransactions) {
    // validate input
    const validate = new ValidatorService<GetTransactions>(input).validate(
      GetTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    const wallet = await this._walletRepo.findById(input.walletId);
    // check wallet exists
    if (!wallet || wallet.userId != input.userId) {
      throw new NotFound('wallet not found');
    }
    return await this._transRepo.get(input);
  }

  async updateTransaction(input: UpdateTransaction) {
    // validate input
    const validate = new ValidatorService<UpdateTransaction>(input).validate(
      UpdateTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check transaction exists
    const transaction = await this._transRepo.findById(input.transId);
    if (!transaction || transaction.wallet!.userId != input.userId) {
      throw new NotFound('transaction not found');
    }

    // check label exists (if specifyed)
    let label = undefined;
    if (input.labelId) {
      label = await this._transLabelRepo.findById(input.labelId);
      if (!label || label.author != input.userId) {
        throw new NotFound('label not found');
      }
      if (label.category != transaction.label!.category) {
        throw new NotFound('change lable is not possible');
      }
    }

    // update transaction
    return await this._transRepo.update({ ...input, label, transaction });
  }

  async deleteTransaction(input: DeleteTransaction) {
    // validate input
    const validate = new ValidatorService<DeleteTransaction>(input).validate(
      DeleteTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check transaction exists
    const transaction = await this._transRepo.findById(input.transId);
    if (!transaction || transaction.wallet!.userId != input.userId) {
      throw new NotFound('transaction not found');
    }

    // delete transaction
    await this._transRepo.delete(transaction as TransInputsRepo.Delete);
  }

  async newLabel(input: NewTransactionLabel) {
    // validate input
    const validate = new ValidatorService<NewTransactionLabel>(input).validate(
      NewTransactionLabelSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // create a label
    return await this._transLabelRepo.create(input);
  }

  async getLabel(input: GetTransactionLabel) {
    // validate input
    const validate = new ValidatorService<GetTransactionLabel>(input).validate(
      GetTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    return await this._transLabelRepo.get(input);
  }

  async updateLabel(input: UpdateTransactionLabel) {
    // validate input
    const validate = new ValidatorService<UpdateTransactionLabel>(input).validate(
      UpdateTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._transLabelRepo.findById(input.labelId);
    if (!label || label.author != input.author) {
      throw new NotFound('label not found');
    }

    // update label
    return await this._transLabelRepo.update(input);
  }

  async deleteLabel(input: DeleteTransactionLabel) {
    // validate input
    const validate = new ValidatorService<DeleteTransactionLabel>(input).validate(
      DeleteTransactionSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._transLabelRepo.findById(input.labelId);
    if (!label || label.author != input.author) {
      throw new NotFound('label not found');
    }

    // check merg label exists
    if (input.mergeTo) {
      const merg = await this._transLabelRepo.findById(input.mergeTo);
      if (!merg || input.mergeTo != merg.author) {
        throw new NotFound('merg label is not found');
      }
    }
    await this._transLabelRepo.delete(input);
  }
}
