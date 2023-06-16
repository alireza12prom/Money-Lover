import { BadRequest, NotFound, ServerError } from '../../errors';
import { PasswordService, ValidatorService } from '../../public/service';
import {
  IProfileRepository,
  IProfileService,
  InputProfileService,
  ISessionRepository
} from './interface';
import { ChangePasswordSchema, CloseSessionSchema, UpdateProfileSchema } from './schema';

export class ProfileService implements IProfileService {
  constructor(
    private readonly _profileRepo: IProfileRepository,
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async getProfile(userId: string) {
    const profile = await this._profileRepo.findById(userId);
    if (!profile) throw new ServerError('something went wrong!');

    return {
      name: profile.name,
      family: profile.family,
      email: profile.email,
      createdAt: profile.createAt
    };
  }

  async updateProfile(input: InputProfileService.UpdateProfile) {
    // validate input
    const validate = new ValidatorService<InputProfileService.UpdateProfile>(
      input
    ).validate(UpdateProfileSchema);
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check email is unique (if specifyed)
    if (input.email && (await this._profileRepo.findByEmail(input.email))) {
      throw new BadRequest('email is no unique.');
    }

    // update profile
    const profile = await this._profileRepo.update(input);

    return {
      name: profile.name,
      family: profile.family,
      email: profile.email,
      createdAt: profile.createAt
    };
  }

  async changePassword(input: InputProfileService.ChangePassword) {
    // validate input
    const validate = new ValidatorService<InputProfileService.ChangePassword>(
      input
    ).validate(ChangePasswordSchema);
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check old password is currect
    const profile = await this._profileRepo.findById(input.userId);
    if (!profile) throw new ServerError('somwthign went wrong');

    if (!(await PasswordService.compare(input.prevPass, profile.password))) {
      throw new BadRequest('password is wrong');
    }

    // change password
    const hash = await PasswordService.encript(input.newPass);
    await this._profileRepo.update({ userId: input.userId, password: hash });
  }

  async getSessoins(userId: string) {
    return await this._sessionRepo.get(userId);
  }

  async closeSessoin(input: InputProfileService.CloseSessoin) {
    // validate input
    const validate = new ValidatorService<InputProfileService.CloseSessoin>(
      input
    ).validate(CloseSessionSchema);
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // close session if exists
    if (!(await this._sessionRepo.delete(input))) {
      throw new NotFound('session not found');
    }
  }
}
