import { Sessions, Users } from '@prisma/client';

// -------- Types
export namespace InputProfileService {
  export type ChangePassword = {
    userId: string;
    prevPass: string;
    newPass: string;
  };

  export type UpdateProfile = {
    userId: string;
    name?: string;
    family?: string;
    email?: string;
  };

  export type CloseSessoin = {
    userId: string;
    sessionId: string;
  };
}

export namespace InputProfileRepoType {
  export type UpdateProfile = {
    userId: string;
    name?: string;
    family?: string;
    email?: string;
    password?: string;
  };
}

// -------- Repositories
export interface IProfileRepository {
  update(input: InputProfileRepoType.UpdateProfile): Promise<Users>;
  findById(userId: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
}

export interface ISessionRepository {
  get(userId: string): Promise<Sessions[]>;
  delete(input: InputProfileService.CloseSessoin): Promise<number>;
}

// -------- Service
export interface IProfileService {
  getProfile(
    userId: string
  ): Promise<{ name: string; family: string | null; email: string; createdAt: Date }>;

  updateProfile(
    input: InputProfileService.UpdateProfile
  ): Promise<{ name: string; family: string | null; email: string; createdAt: Date }>;

  changePassword(input: InputProfileService.ChangePassword): Promise<void>;
  getSessoins(userId: string): Promise<Sessions[]>;
  closeSessoin(input: InputProfileService.CloseSessoin): Promise<void>;
}
