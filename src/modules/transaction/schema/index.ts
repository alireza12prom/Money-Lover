import joi from 'joi';
import { InputTransactionType } from '../interface';
import { TransactionsCategory } from '@prisma/client';

// ----------- transaction
export const NewTransactionSchema = joi.object<InputTransactionType.NewTransaction>({
  userId: joi.string().uuid().required(),
  labelId: joi.string().uuid().required(),
  walletId: joi.string().uuid().required(),
  amount: joi.number().greater(0).required(),
  note: joi.string().trim().empty('').default('')
});

export const GetTransactionSchema = joi.object<InputTransactionType.GetTransactions>({
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

export const DeleteTransactionSchema = joi.object<InputTransactionType.DeleteTransaction>(
  {
    transId: joi.string().uuid().required(),
    userId: joi.string().uuid().required()
  }
);

export const UpdateTransactionSchema = joi.object<InputTransactionType.UpdateTransaction>(
  {
    userId: joi.string().uuid().required(),
    transId: joi.string().uuid().required(),
    labelId: joi.string().uuid().empty(''),
    amount: joi.number().greater(0).empty(''),
    note: joi.string().trim().empty('')
  }
);

// ----------- label
export const NewTransactionLabelSchema =
  joi.object<InputTransactionType.NewTransactionLabel>({
    author: joi.string().uuid().required(),
    title: joi.string().required(),
    category: joi.string().uppercase().valid(TransactionsCategory).required()
  });

export const UpdateTransactionLabelSchema =
  joi.object<InputTransactionType.UpdateTransactionLabel>({
    labelId: joi.string().uuid().required(),
    author: joi.string().uuid().required(),
    title: joi.string().required()
  });

export const DeleteTransactionLabelSchema =
  joi.object<InputTransactionType.DeleteTransactionLabel>({
    author: joi.string().uuid().required(),
    labelId: joi.string().uuid().required(),
    mergeTo: joi.string().uuid().empty('')
  });

export const GetTransactionLabelSchema =
  joi.object<InputTransactionType.GetTransactionLabel>({
    author: joi.string().uuid().required()
  });
