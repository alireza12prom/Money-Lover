import { BaseRepository } from '../../../public/interface';
import {
  ITransactionLabelRepository,
  InputTransactionLabelRepositoryType
} from '../interface';

export class TransactionLabelRepository
  extends BaseRepository
  implements ITransactionLabelRepository
{
  async get(input: InputTransactionLabelRepositoryType.GetTransactionLabel) {
    return await this.client.transactionLabels.findMany({
      where: { author: input.author }
    });
  }

  async create(input: InputTransactionLabelRepositoryType.NewTransactionLabel) {
    return await this.client.transactionLabels.create({
      data: input
    });
  }

  async update(input: InputTransactionLabelRepositoryType.UpdateTransactionLabel) {
    return await this.client.transactionLabels.update({
      where: {
        id: input.labelId
      },
      data: {
        title: input.title
      }
    });
  }

  async delete(input: InputTransactionLabelRepositoryType.DeleteTransactionLabel) {
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
