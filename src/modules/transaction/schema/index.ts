import joi from 'joi';
import { InputTransType } from '../interface';

// ----------- transaction
export const NewTransactionSchema = joi.object<InputTransType.NewTransaction>({
  userId: joi.string().uuid().required(),
  labelId: joi.string().uuid().required(),
  walletId: joi.string().uuid().required(),
  amount: joi.number().greater(0).required(),
  note: joi.string().trim().empty('').default('')
});

export const GetTransactionSchema = joi.object<InputTransType.GetTransactions>({
  userId: joi.string().uuid().required(),
  walletId: joi.string().uuid().required(),
  year: joi
    .number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .default(new Date().getFullYear()),
  month: joi
    .number()
    .integer()
    .min(1)
    .max(12)
    .default(new Date().getMonth() + 1),
  limit: joi.number().integer().min(1).empty('').default(10),
  page: joi.number().integer().min(1).empty('').default(1)
});

export const DeleteTransactionSchema = joi.object<InputTransType.DeleteTransaction>({
  transId: joi.string().uuid().required(),
  userId: joi.string().uuid().required()
});

export const UpdateTransactionSchema = joi.object<InputTransType.UpdateTransaction>({
  userId: joi.string().uuid().required(),
  transId: joi.string().uuid().required(),
  labelId: joi.string().uuid().empty(''),
  amount: joi.number().greater(0).empty(''),
  note: joi.string().trim().empty('')
});
