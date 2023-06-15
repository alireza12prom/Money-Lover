import joi from 'joi';
import { InputLabelType } from '../interface';
import { TransactionsCategory } from '@prisma/client';

export const NewLabelSchema = joi.object<InputLabelType.NewLabel>({
  author: joi.string().uuid().required(),
  title: joi.string().required(),
  category: joi
    .string()
    .uppercase()
    .valid(...Object.values(TransactionsCategory))
    .required()
});

export const UpdateLabelSchema = joi.object<InputLabelType.UpdateLabel>({
  labelId: joi.string().uuid().required(),
  author: joi.string().uuid().required(),
  title: joi.string().required()
});

export const DeleteLabelSchema = joi.object<InputLabelType.DeleteLabel>({
  author: joi.string().uuid().required(),
  labelId: joi.string().uuid().required(),
  mergeTo: joi.string().uuid().empty('')
});

export const GetLabelSchema = joi.object<InputLabelType.GetLabel>({
  author: joi.string().uuid().required()
});
