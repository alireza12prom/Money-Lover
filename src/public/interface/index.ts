import { Prisma, PrismaClient } from '@prisma/client';
import { IRouter, Request, Response } from 'express';
import { HTTPError } from '../../errors';
import { StatusCodes } from 'http-status-codes';

export abstract class BaseRepository {
  constructor(protected readonly client: PrismaClient) {}
}

export type Controller = (req: Request, res: Response) => Promise<void>;

export abstract class BaseController {
  constructor(protected readonly _router: IRouter) {}

  get router() {
    return this._router;
  }

  protected static wrapper(controller: Controller) {
    return async (req: Request, res: Response) => {
      try {
        await controller(req, res);
      } catch (error) {
        console.log(error);

        if (error instanceof HTTPError) {
          return res.status(error.code).json({ msg: error.message });
        }
        if (error instanceof Prisma.PrismaClientInitializationError) {
          return res
            .status(StatusCodes.SERVICE_UNAVAILABLE)
            .json({ msg: 'database is not available' });
        }
        res.status(500).json({ msg: 'Unknown Error', details: error });
      }
    };
  }
}
