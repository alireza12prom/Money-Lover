import { IRouter, Request, Response } from 'express';
import { BaseController } from '../../public/interface';
import { ILabelService } from './interface';
import { authorization } from '../../public/controller';
import { StatusCodes } from 'http-status-codes';

export class LabelController extends BaseController {
  private readonly _service;
  constructor(router: IRouter, _service: ILabelService) {
    super(router);
    this._service = _service;
  }

  setup() {
    // Middlewares
    this._router.use(LabelController.wrapper(authorization, true));

    // Controller
    this._router.get('/', LabelController.wrapper(this.getLabels.bind(this)));
    this._router.post('/', LabelController.wrapper(this.newLabels.bind(this)));
    this._router.patch('/', LabelController.wrapper(this.updateLabel.bind(this)));
    this._router.delete('/', LabelController.wrapper(this.deleteLabel.bind(this)));
  }

  // label
  private async newLabels(req: Request, res: Response) {
    const { id } = req.user;
    const { title, category } = req.body;

    const label = await this._service.newLabel({ author: id, category, title });
    res.status(StatusCodes.CREATED).json(label);
  }

  private async getLabels(req: Request, res: Response) {
    const { id } = req.user;

    const labels = await this._service.getLabel({ author: id });
    res.status(StatusCodes.OK).json(labels);
  }

  private async deleteLabel(req: Request, res: Response) {
    const { id } = req.user;
    const { labelId } = req.body;

    await this._service.deleteLabel({ author: id, labelId });
    res.status(StatusCodes.OK).send('DELETED');
  }

  private async updateLabel(req: Request, res: Response) {
    const { id } = req.user;
    const { labelId, title } = req.body;

    const label = await this._service.updateLabel({ author: id, labelId, title });
    res.status(StatusCodes.OK).json(label);
  }
}
