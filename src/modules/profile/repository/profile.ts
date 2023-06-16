import { BaseRepository } from '../../../public/interface';
import { IProfileRepository, InputProfileRepoType } from '../interface';

export class ProfileRepository extends BaseRepository implements IProfileRepository {
  async update(input: InputProfileRepoType.UpdateProfile) {
    return await this.client.users.update({
      where: {
        id: input.userId
      },
      data: {
        name: input.name,
        family: input.family,
        email: input.email,
        password: input.password
      }
    });
  }

  async findById(userId: string) {
    return await this.client.users.findUnique({ where: { id: userId } });
  }

  async findByEmail(email: string) {
    return await this.client.users.findFirst({ where: { email } });
  }
}
