import { IRouter, Request, Response } from 'express';
import { Interfaces } from '../public';
import { IWalletService } from './interface';
import { StatusCodes } from 'http-status-codes';
import { authorization } from '../public/controller';

export class WalletController extends Interfaces.BaseController {
  private readonly _service;
  constructor(router: IRouter, service: IWalletService) {
    super(router);
    this._service = service;
  }

  setup() {
    // Middlewares
    this._router.use(WalletController.wrapper(authorization, true));

    // Controllers
    this._router.post('/', WalletController.wrapper(this.newWallet.bind(this)));
    this._router.get('/', WalletController.wrapper(this.getWallets.bind(this)));
    this._router.patch('/', WalletController.wrapper(this.updateWallet.bind(this)));
    this._router.delete('/', WalletController.wrapper(this.deleteWallet.bind(this)));
  }

  private async newWallet(req: Request, res: Response) {
    const { id } = req.user;
    const { balance, currency, name } = req.body;
    const input = { userId: id, balance, currency, name };

    const new_wallet = await this._service.newWallet(input);
    res.status(StatusCodes.CREATED).json(new_wallet);
  }

  private async getWallets(req: Request, res: Response) {
    const { id } = req.user;

    const wallets = await this._service.getWallets(id);
    res.status(StatusCodes.OK).json(wallets);
  }

  private async updateWallet(req: Request, res: Response) {
    const { id } = req.user;
    const { walletId, balance, currency, freeze, name } = req.body;
    const input = { userId: id, walletId, balance, currency, freeze, name };

    const wallet = await this._service.updateWallet(input);
    res.status(StatusCodes.OK).json(wallet);
  }

  private async deleteWallet(req: Request, res: Response) {
    const { id } = req.user;
    const { walletId } = req.body;

    await this._service.deleteWallet({ userId: id, walletId });
    res.status(StatusCodes.OK).send('DELETED');
  }
}
