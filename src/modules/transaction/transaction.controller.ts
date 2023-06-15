import { IRouter, Request, Response } from 'express';
import { BaseController } from '../../public/interface';
import { ITransactionService } from './interface';
import { authorization } from '../../public/controller';
import { StatusCodes } from 'http-status-codes';

export class TransactionController extends BaseController {
  private readonly _service;
  constructor(router: IRouter, _service: ITransactionService) {
    super(router);
    this._service = _service;
  }

  setup() {
    // Middlewares
    this._router.use(TransactionController.wrapper(authorization, true));

    // Controller
    this.router.post('/', TransactionController.wrapper(this.newTransaction.bind(this)));
    this.router.get('/', TransactionController.wrapper(this.getTransactions.bind(this)));

    this.router.patch(
      '/',
      TransactionController.wrapper(this.updateTransaction.bind(this))
    );

    this.router.delete(
      '/',
      TransactionController.wrapper(this.deleteTransaction.bind(this))
    );
  }

  // transaction
  private async newTransaction(req: Request, res: Response) {
    const { id } = req.user;
    const { walletId, labelId, amount, note } = req.body;
    const input = { userId: id, walletId, labelId, amount, note };

    const transaction = await this._service.newTransaction(input);
    res.status(StatusCodes.CREATED).json(transaction);
  }

  private async getTransactions(req: Request, res: Response) {
    const { id } = req.user;
    const { limit, page, walletId, month, year } = req.body;
    const input = { userId: id, limit, page, walletId, month, year };

    const transaction = await this._service.getTransactions(input);
    res.status(StatusCodes.OK).json(transaction);
  }

  private async updateTransaction(req: Request, res: Response) {
    const { id } = req.user;
    const { transId, labelId, amount, note } = req.body;
    const input = { userId: id, transId, labelId, amount, note };

    const transaction = await this._service.updateTransaction(input);
    res.status(StatusCodes.OK).json(transaction);
  }

  private async deleteTransaction(req: Request, res: Response) {
    const { id } = req.user;
    const { transId } = req.body;

    await this._service.deleteTransaction({ userId: id, transId });
    res.status(StatusCodes.OK).send('DELETED');
  }
}
