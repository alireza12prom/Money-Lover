import joi from 'joi';
import { InputServiceType } from '../interface';
import { Currency } from '@prisma/client';

export const NewWalletSchema = joi.object<InputServiceType.NewWallet>({
  userId: joi.string().trim().uuid().required(),
  name: joi.string().trim().max(25).required(),
  balance: joi.number().min(0).default(0),
  currency: joi
    .string()
    .uppercase()
    .valid(...Object.keys(Currency))
    .required()
});

export const UpdateWalletSchema = joi.object<InputServiceType.UpdateWallet>({
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

export const DeleteWalletSchema = joi.object<InputServiceType.DeleteWallet>({
  userId: joi.string().trim().uuid().required(),
  walletId: joi.string().trim().uuid().required()
});
