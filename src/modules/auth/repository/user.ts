import { IUserRepository, InputUserRepositoryType } from '../interface';
import { Interfaces } from '../../../public';

export class UserRepository extends Interfaces.BaseRepository implements IUserRepository {
  async create(input: InputUserRepositoryType.SignupInput) {
    return await this.client.users.create({ data: input });
  }

  async findByEmail(email: string) {
    return await this.client.users.findUnique({ where: { email: email } });
  }
}
