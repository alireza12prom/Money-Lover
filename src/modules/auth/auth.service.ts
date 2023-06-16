import { Prisma, Sessions } from '@prisma/client';
import { BadRequest, Forbidden, TooManyRequest, Unauthorized } from '../../errors';
import { SigninSchema, SignupSchema } from './schema';
import config from '../../config/index.json';

import {
  ValidatorService,
  PasswordService,
  TokenService,
  IPService
} from '../../public/service';

import {
  IUserRepository,
  IAuthService,
  ISessionRepository,
  ILogRepository,
  IBlackListpository,
  InputServiceType
} from './interface';

export class AuthService implements IAuthService {
  constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _logRepo: ILogRepository,
    private readonly _blacklistRepo: IBlackListpository,
    private readonly _sessionRepo: ISessionRepository
  ) {}

  public async signup(input: InputServiceType.SignupInput) {
    // validate input
    const validate = new ValidatorService<InputServiceType.SignupInput>(input).validate(
      SignupSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // hash password
    input.password = await PasswordService.encript(input.password);

    try {
      // create a new user
      await this._userRepo.create(input);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new BadRequest('user with this information already registered');
        }
      }
      throw error;
    }
  }

  public async signin(input: InputServiceType.SigninInput) {
    // validate input
    const validate = new ValidatorService<InputServiceType.SigninInput>(input).validate(
      SigninSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check user exists
    const user = await this._userRepo.findByEmail(input.email);
    if (!user) {
      throw new BadRequest('User is not registered with this email');
    }

    // check user is blocked
    if (await this._blacklistRepo.exists(user.id)) {
      throw new Forbidden(
        `your account has been blocked for ${config.BlockPolicy.BLOCK_FOR} hours.`
      );
    }

    // check password
    if (!(await PasswordService.compare(input.password, user.password))) {
      // logging
      await this._logRepo.create('WrongPassword', user.id);

      // blocking client if number of tries recived to limit
      const tries = await this._logRepo.countWrongPassword(user.id);
      if (tries >= config.BlockPolicy.MAX_TRIES) {
        // logging
        process.nextTick(async () => {
          await this._logRepo.create('NewBlock', user.id);
        });

        await this._blacklistRepo.create({ userId: user.id });
        throw new TooManyRequest('Limit in wrong password');
      }
      throw new Unauthorized('Email and Password do not match');
    }

    // check sessions status
    let session: Sessions;
    if (input.ip && IPService.isValid(input.ip)) {
      // try to convert IPv4
      input.ip = IPService.toIPv4(input.ip);

      // check session exists
      const founded_session = await this._sessionRepo.find(user.id, input.ip);
      if (!founded_session) {
        // check number of openend sessions
        const max_open_session = config.Session.MAX_OPEN_SESSION;
        const opened_sessions = await this._sessionRepo.numberOfOpenSerssoins(user.id);
        if (opened_sessions >= max_open_session) {
          throw new Forbidden(`you have currntly ${opened_sessions} opened sessions.`);
        }

        // open a new session
        session = await this._sessionRepo.create({ userId: user.id, ip: input.ip });
      } else {
        session = founded_session;
      }
    } else {
      throw new Forbidden('unknown ip address');
    }

    // logging
    process.nextTick(async () => {
      await this._logRepo.create('NewLogin', user.id);
    });

    // generate access/refresh token
    return {
      access: TokenService.genAccessToken(session.id),
      refresh: TokenService.genRefreshToken(session.id)
    };
  }
}
