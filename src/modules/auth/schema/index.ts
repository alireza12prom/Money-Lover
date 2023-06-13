import joi from 'joi';
import { SigninInput, SignupInput } from '../interface';

export const SignupSchema = joi.object<SignupInput, true, SignupInput>({
  name: joi.string().lowercase().required(),
  family: joi.string().lowercase().required(),
  email: joi.string().email(),
  password: joi.string().required().min(5)
});

export const SigninSchema = joi.object<SigninInput, true, SigninInput>({
  ip: joi.string(),
  email: joi.string().trim().email({}).required(),
  password: joi.string().required().min(5)
});
