import joi from 'joi';
import {
  DeleteTransaction,
  DeleteTransactionLabel,
  GetTransactionLabel,
  GetTransactions,
  NewTransaction,
  NewTransactionLabel,
  UpdateTransaction,
  UpdateTransactionLabel
} from '../interface';
import { TransactionsCategory } from '@prisma/client';

// ----------- transaction
export const NewTransactionSchema = joi.object<NewTransaction, true, NewTransaction>({
  userId: joi.string().uuid().required(),
  labelId: joi.string().uuid().required(),
  walletId: joi.string().uuid().required(),
  amount: joi.number().greater(0).required(),
  note: joi.string().trim().empty('').default('')
});

export const GetTransactionSchema = joi.object<GetTransactions, true, GetTransactions>({
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

export const DeleteTransactionSchema = joi.object<
  DeleteTransaction,
  true,
  DeleteTransaction
>({
  transId: joi.string().uuid().required(),
  userId: joi.string().uuid().required()
});

export const UpdateTransactionSchema = joi.object<
  UpdateTransaction,
  true,
  UpdateTransaction
>({
  userId: joi.string().uuid().required(),
  transId: joi.string().uuid().required(),
  labelId: joi.string().uuid().empty(''),
  amount: joi.number().greater(0).empty(''),
  note: joi.string().trim().empty('')
});

// ----------- label
export const NewTransactionLabelSchema = joi.object<
  NewTransactionLabel,
  true,
  NewTransactionLabel
>({
  author: joi.string().uuid().required(),
  title: joi.string().required(),
  category: joi.string().uppercase().valid(TransactionsCategory).required()
});

export const UpdateTransactionLabelSchema = joi.object<
  UpdateTransactionLabel,
  true,
  UpdateTransactionLabel
>({
  labelId: joi.string().uuid().required(),
  author: joi.string().uuid().required(),
  title: joi.string().required()
});

export const DeleteTransactionLabelSchema = joi.object<
  DeleteTransactionLabel,
  true,
  DeleteTransactionLabel
>({
  author: joi.string().uuid().required(),
  labelId: joi.string().uuid().required(),
  mergeTo: joi.string().uuid().empty('')
});

export const GetTransactionLabelSchema = joi.object<
  GetTransactionLabel,
  true,
  GetTransactionLabel
>({
  author: joi.string().uuid().required()
});
