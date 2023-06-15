import { BaseRepository } from '../../../public/interface';
import { ILabelRepository, InputLabelType } from '../interface';

export class LabelRepository extends BaseRepository implements ILabelRepository {
  async get(input: InputLabelType.GetLabel) {
    return await this.client.transactionLabels.findMany({
      where: { author: input.author }
    });
  }

  async create(input: InputLabelType.NewLabel) {
    return await this.client.transactionLabels.create({
      data: input
    });
  }

  async update(input: InputLabelType.UpdateLabel) {
    return await this.client.transactionLabels.update({
      where: {
        id: input.labelId
      },
      data: {
        title: input.title
      }
    });
  }

  async delete(input: InputLabelType.DeleteLabel) {
    if (input.mergeTo) {
      await this.client.$transaction([
        // merge transaction to new label
        this.client.transactions.updateMany({
          where: {
            labelId: input.labelId
          },
          data: {
            labelId: input.mergeTo
          }
        }),

        // delete label
        this.client.transactionLabels.delete({
          where: { id: input.labelId }
        })
      ]);
    } else {
      await this.client.transactionLabels.delete({
        where: {
          id: input.labelId
        }
      });
    }
  }

  async findById(id: string) {
    return await this.client.transactionLabels.findUnique({ where: { id } });
  }
}
