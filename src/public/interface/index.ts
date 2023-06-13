import { Prisma, PrismaClient } from '@prisma/client';
import { IRouter, NextFunction, Request, Response } from 'express';
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

  protected static wrapper(controller: Controller, callNext = false) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await controller(req, res);
        callNext && next();
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
