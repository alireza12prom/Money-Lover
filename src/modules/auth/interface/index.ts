import { Users, Sessions } from '@prisma/client';
import { Interfaces } from '../../../public/repository';

export namespace InputServiceType {
  export type SignupInput = Pick<Users, 'name' | 'family' | 'email' | 'password'>;
  export type SigninInput = Pick<Users, 'email' | 'password'> & { ip: string | null };
}

export namespace InputUserRepositoryType {
  export type SignupInput = Pick<Users, 'name' | 'family' | 'email' | 'password'>;
}

export namespace InputSessionRepositoryType {
  export type NewSession = Pick<Sessions, 'userId' | 'ip'>;
}

export namespace InputBlackListpositoryType {
  export type NewBlackList = { userId: string };
}

// ----------- Repositories
export interface IUserRepository {
  create(input: InputUserRepositoryType.SignupInput): Promise<Users>;
  findByEmail(id: string): Promise<Users | null>;
}

export interface ISessionRepository {
  find(userId: string, ip: string): Promise<Sessions | null>;
  create(input: InputSessionRepositoryType.NewSession): Promise<Sessions>;
  exists(userId: string, ip: string): Promise<boolean>;
  numberOfOpenSerssoins(userId: string): Promise<number>;
}

export interface IBlackListpository {
  create(input: InputBlackListpositoryType.NewBlackList): Promise<void>;
  exists(userId: string): Promise<boolean>;
}

export interface ILogRepository extends Interfaces.IBaseLogRepository {
  countWrongPassword(userId: string): Promise<number>;
}

// ----------- Services
export interface IAuthService {
  signup(input: InputServiceType.SignupInput): Promise<void>;
  signin(
    input: InputServiceType.SigninInput
  ): Promise<{ access: string; refresh: string }>;
}
