import { BaseRepository } from '../../../public/interface';
import { ITransactionRepository, InputTransactionRepositoryType } from '../interface';

export class TransactionRepository
  extends BaseRepository
  implements ITransactionRepository
{
  async get(input: InputTransactionRepositoryType.GetTransactions) {
    const start_date = new Date(
      `${input.year}-${input.month >= 10 ? '' : '0'}${input.month}`
    );

    const end_date = new Date(
      `${input.year}-${input.month >= 10 ? '' : '0'}${input.month}`
    );
    end_date.setMonth(end_date.getMonth() + 1);

    return await this.client.$queryRaw`
      SELECT 
        label, 
        array_agg(
          jsonb_build_object(
            'id',id,
            'amuont',amount,
            'walletId', "walletId",
            'note', note,
            'createdAt', "createdAt",
            'updatedAt', "updatedAt"
          )
        ) as transactions
        FROM view_trans_1  
            WHERE 
            "createdAt" >= ${start_date}::TIMESTAMP 
              AND
            "createdAt" < ${end_date}::TIMESTAMP
        GROUP BY label ORDER BY max("createdAt") DESC;`;
  }

  async create(input: InputTransactionRepositoryType.NewTransaction) {
    const [_, transaction] = await this.client.$transaction([
      // updaet wallet
      this.client.wallets.update({
        where: { id: input.walletId },
        data: {
          balance:
            input.label.category == 'EXPENSE'
              ? { decrement: input.amount }
              : { increment: input.amount }
        }
      }),

      // create a transation
      this.client.transactions.create({
        data: {
          walletId: input.walletId,
          labelId: input.labelId,
          amount: input.amount,
          note: input.note
        }
      })
    ]);
    return transaction;
  }

  async update(input: InputTransactionRepositoryType.UpdateTransaction) {
    let backAmount = 0;
    const transaction = input.transaction;

    if (input.labelId && input.label?.category != transaction.label.category) {
      if (input.label?.category == 'EXPENSE') {
        backAmount += 2 * -transaction.amount;
      } else {
        backAmount += 2 * +transaction.amount;
      }
      transaction.label = input.label!;
    }

    if (input.amount && input.amount != +transaction.amount) {
      if (transaction.label.category == 'EXPENSE') {
        backAmount += +transaction.amount - input.amount;
      } else {
        backAmount += input.amount - +transaction.amount;
      }
    }

    const [_, updatedTransaction] = await this.client.$transaction([
      this.client.wallets.update({
        where: { id: transaction.walletId },
        data: { balance: { increment: backAmount } }
      }),
      this.client.transactions.update({
        where: { id: input.transId },
        data: {
          amount: input.amount,
          labelId: input.labelId,
          note: input.note
        }
      })
    ]);
    return updatedTransaction;
  }

  async delete(transaction: InputTransactionRepositoryType.DeleteTransaction) {
    await this.client.$transaction([
      // delete transaction
      this.client.transactions.delete({
        where: { id: transaction.id }
      }),

      // update wallet
      this.client.wallets.update({
        where: { id: transaction.walletId },
        data: {
          balance:
            transaction.label.category == 'EXPENSE'
              ? { increment: transaction.amount }
              : { decrement: transaction.amount }
        }
      })
    ]);
  }

  async findById(transId: string) {
    return await this.client.transactions.findUnique({
      where: { id: transId },
      include: { label: true, wallet: true }
    });
  }
}
