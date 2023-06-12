import { LogLabels, Logs, Prisma } from '@prisma/client';

export interface IBaseLogRepository {
  create(label: LogLabels, userId: string, detail?: Prisma.JsonObject): Promise<Logs>;
}
