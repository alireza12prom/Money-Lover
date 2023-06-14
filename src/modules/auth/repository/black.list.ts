import { BaseRepository } from '../../../public/interface';
import { TimeService } from '../../../public/service';
import config from '../../../config/index.json';
import { IBlackListpository, InputBlackListpositoryType } from '../interface';

export class BlackListRepository extends BaseRepository implements IBlackListpository {
  async create(input: InputBlackListpositoryType.NewBlackList) {
    await this.client.blackList.create({
      data: {
        userId: input.userId,
        unblockAt: TimeService.nextNHourDate(config.BlockPolicy.BLOCK_FOR)
      }
    });
  }

  async exists(userId: string) {
    const result = await this.client.blackList.findFirst({
      where: { userId, unblockAt: { gt: new Date() } }
    });

    return result ? true : false;
  }
}
