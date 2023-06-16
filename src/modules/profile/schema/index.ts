import joi from 'joi';
import { InputProfileService } from '../interface';
import config from '../../../config/index.json';

export const UpdateProfileSchema = joi.object<InputProfileService.UpdateProfile>({
  userId: joi.string().uuid().required(),
  name: joi.string().lowercase().empty(''),
  family: joi.string().lowercase().empty(''),
  email: joi.string().email().empty('')
});

export const ChangePasswordSchema = joi.object<InputProfileService.ChangePassword>({
  userId: joi.string().uuid().required(),
  prevPass: joi.string().required(),
  newPass: joi
    .string()
    .required()
    .min(config.User.MIN_PASSWORD_LENGTH)
    .max(config.User.MAX_PASSWORD_LENGTH)
});

export const CloseSessionSchema = joi.object<InputProfileService.CloseSessoin>({
  userId: joi.string().uuid().required(),
  sessionId: joi.string().uuid().required()
});
