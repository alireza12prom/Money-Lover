import { IRouter, Request, Response } from 'express';
import { IAuthService } from './interface';
import { Interfaces } from '../../public';
import { StatusCodes } from 'http-status-codes';
import { getClientIp } from 'request-ip';

export class AuthController extends Interfaces.BaseController {
  private readonly _service;
  constructor(router: IRouter, service: IAuthService) {
    super(router);
    this._service = service;
  }

  public setup() {
    this._router.post('/signup', AuthController.wrapper(this.signup.bind(this)));
    this._router.post('/signin', AuthController.wrapper(this.signin.bind(this)));
  }

  private async signup(req: Request, res: Response) {
    const { name, family, email, password } = req.body;
    const user = await this._service.signup({ name, family, email, password });
    res.send(user);
  }

  private async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this._service.signin({ email, password, ip: getClientIp(req) });
    res.status(StatusCodes.OK).json(user);
  }
}
