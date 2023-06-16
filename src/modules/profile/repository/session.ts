import { BaseRepository } from '../../../public/interface';
import { ISessionRepository, InputProfileService } from '../interface';

export class SessionRepository extends BaseRepository implements ISessionRepository {
  async get(userId: string) {
    return await this.client.sessions.findMany({ where: { userId } });
  }

  async delete(input: InputProfileService.CloseSessoin) {
    return (
      await this.client.sessions.deleteMany({
        where: { id: input.sessionId, userId: input.userId }
      })
    ).count;
  }
}
