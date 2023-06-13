import joi from 'joi';
import { DeleteWallet, NewWallet, UpdateWallet } from '../interface';
import { Currency } from '@prisma/client';

export const NewWalletSchema = joi.object<NewWallet, true, NewWallet>({
  userId: joi.string().trim().uuid().required(),
  name: joi.string().trim().max(25).required(),
  balance: joi.number().min(0).default(0),
  currency: joi
    .string()
    .uppercase()
    .valid(...Object.keys(Currency))
    .required()
});

export const UpdateWalletSchema = joi.object<UpdateWallet, true, UpdateWallet>({
  userId: joi.string().trim().uuid().required(),
  walletId: joi.string().trim().uuid().required(),
  name: joi.string().trim().max(25).empty(''),
  balance: joi.number().min(0).empty(''),
  freeze: joi.boolean().empty(''),
  currency: joi
    .string()
    .uppercase()
    .valid(...Object.keys(Currency))
    .empty('')
});

export const DeleteWalletSchema = joi.object<DeleteWallet, true, DeleteWallet>({
  userId: joi.string().trim().uuid().required(),
  walletId: joi.string().trim().uuid().required()
});
