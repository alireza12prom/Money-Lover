import { Interfaces } from '../../../public';
import { ISessionRepository, InputSessionRepositoryType } from '../interface';

export class SessionRepository
  extends Interfaces.BaseRepository
  implements ISessionRepository
{
  async create(input: InputSessionRepositoryType.NewSession) {
    return await this.client.sessions.create({ data: input });
  }

  async find(userId: string, ip: string) {
    return await this.client.sessions.findUnique({
      where: { userId_ip: { ip: ip, userId: userId } }
    });
  }

  async numberOfOpenSerssoins(id: string) {
    return await this.client.sessions.count({ where: { userId: id } });
  }

  async exists(userId: string, ip: string) {
    const target = await this.client.sessions.findUnique({
      where: { userId_ip: { userId, ip } }
    });
    return target ? true : false;
  }
}
