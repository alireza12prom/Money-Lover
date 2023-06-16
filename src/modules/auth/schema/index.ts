import joi from 'joi';
import config from '../../../config/index.json';
import { InputServiceType } from '../interface';

export const SignupSchema = joi.object<InputServiceType.SignupInput>({
  name: joi.string().lowercase().required(),
  family: joi.string().lowercase().required(),
  email: joi.string().email(),
  password: joi
    .string()
    .required()
    .min(config.User.MIN_PASSWORD_LENGTH)
    .max(config.User.MAX_PASSWORD_LENGTH)
});

export const SigninSchema = joi.object<InputServiceType.SigninInput>({
  ip: joi.string(),
  email: joi.string().trim().email({}).required(),
  password: joi.string().required()
});
