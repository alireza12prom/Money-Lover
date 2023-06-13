import { Users, Sessions } from '@prisma/client';
import { Interfaces } from '../../../public/repository';

export type SignupInput = Pick<Users, 'name' | 'family' | 'email' | 'password'>;
export type SigninInput = Pick<Users, 'email' | 'password'> & { ip: string | null };
export type NewSession = Pick<Sessions, 'userId' | 'ip'>;

// ----------- Repositories
export interface IUserRepository {
  create(input: SignupInput): Promise<Users>;
  findByEmail(id: string): Promise<Users | null>;
}

export interface ISessionRepository {
  find(userId: string, ip: string): Promise<Sessions | null>;
  create(input: NewSession): Promise<Sessions>;
  exists(userId: string, ip: string): Promise<boolean>;
  numberOfOpenSerssoins(userId: string): Promise<number>;
}

export interface IBlackListpository {
  create(userId: string): Promise<void>;
  exists(userId: string): Promise<boolean>;
}

export interface ILogRepository extends Interfaces.IBaseLogRepository {
  countWrongPassword(userId: string): Promise<number>;
}

// ----------- Services
export interface IAuthService {
  signup(input: SignupInput): Promise<void>;
  signin(input: SigninInput): Promise<{ access: string; refresh: string }>;
}

export interface IAuthValidator {
  signup(input: SignupInput): { error: boolean; data: SignupInput | string };
  signin(input: SigninInput): { error: boolean; data: SigninInput | string };
}
