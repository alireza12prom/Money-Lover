import { IRouter, Request, Response } from 'express';
import { Interfaces } from '../../public';
import { IProfileService } from './interface';
import { StatusCodes } from 'http-status-codes';
import { authorization } from '../../public/controller';

export class ProfileController extends Interfaces.BaseController {
  private readonly _service;
  constructor(router: IRouter, service: IProfileService) {
    super(router);
    this._service = service;
  }

  setup() {
    // Middlewares
    this._router.use(ProfileController.wrapper(authorization, true));

    // Controllers
    this._router.get('/', ProfileController.wrapper(this.getProfile.bind(this)));
    this._router.patch('/', ProfileController.wrapper(this.updateProfile.bind(this)));

    this._router.patch(
      '/change-password',
      ProfileController.wrapper(this.changePassword.bind(this))
    );

    this._router.get(
      '/session',
      ProfileController.wrapper(this.getAllSessions.bind(this))
    );

    this._router.delete(
      '/session',
      ProfileController.wrapper(this.closeSession.bind(this))
    );
  }

  private async getProfile(req: Request, res: Response) {
    const { id } = req.user;

    const profile = await this._service.getProfile(id);
    res.status(StatusCodes.CREATED).json(profile);
  }

  private async updateProfile(req: Request, res: Response) {
    const { id } = req.user;
    const { name, family, email } = req.body;

    const input = { userId: id, name, family, email };
    const profile = await this._service.updateProfile(input);

    res.status(StatusCodes.OK).json(profile);
  }

  private async changePassword(req: Request, res: Response) {
    const { id } = req.user;
    const { prevPass, newPass } = req.body;

    await this._service.changePassword({ userId: id, newPass, prevPass });
    res.status(StatusCodes.OK).send('Password Changed');
  }

  private async getAllSessions(req: Request, res: Response) {
    const { id } = req.user;

    const sessions = await this._service.getSessoins(id);
    res.status(StatusCodes.OK).json(sessions);
  }

  private async closeSession(req: Request, res: Response) {
    const { id } = req.user;
    const { sessionId } = req.body;

    await this._service.closeSessoin({ userId: id, sessionId });
    res.status(StatusCodes.OK).send('Session Closed');
  }
}
