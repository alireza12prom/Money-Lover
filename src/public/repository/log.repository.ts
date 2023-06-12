import { BaseRepository } from '../interface';
import { IBaseLogRepository } from './interface';
import { LogLabels, Prisma } from '@prisma/client';

export class BaseLogRepository extends BaseRepository implements IBaseLogRepository {
  async create(label: LogLabels, userId: string, detail?: Prisma.JsonObject) {
    return await this.client.logs.create({ data: { label, userId, detail } });
  }
}
