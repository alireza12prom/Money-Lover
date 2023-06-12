import { BaseLogRepository } from '../../public/repository';
import { TimeService } from '../../public/service';
import config from '../../config/index.json';
import { ILogRepository } from '../interface';

export class LogRepository extends BaseLogRepository implements ILogRepository {
  async countWrongPassword(userId: string) {
    return await this.client.logs.count({
      where: {
        label: 'WrongPassword',
        userId,
        logedAt: {
          gte: TimeService.lastNHourDate(config.BlockPolicy.PERIOD)
        }
      }
    });
  }
}
