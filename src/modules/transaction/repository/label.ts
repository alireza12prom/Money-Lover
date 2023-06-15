import { BaseRepository } from '../../../public/interface';
import { ILabelRepository } from '../interface';

export class LabelRepository extends BaseRepository implements ILabelRepository {
  async findById(id: string) {
    return await this.client.transactionLabels.findUnique({ where: { id } });
  }
}
