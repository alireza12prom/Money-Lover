import { Request, Response } from 'express';
import { BadRequest } from '../../errors';
import { TokenService } from '../service';
import { prisma } from '../../db';

async function authorization(req: Request, res: Response) {
  // check token exists in header
  const token = req.headers['authorization']?.split(' ').at(1);
  if (!token) {
    throw new BadRequest('authorization header is request');
  }

  // check token signuture & expiretion
  const result = TokenService.validate('access', token);
  if (typeof result == 'string') {
    throw new BadRequest(result);
  }

  // check sessoin exists
  const session = await prisma.sessions.findUnique({ where: { id: result.id } });
  if (!session) {
    throw new BadRequest('session is closed');
  }
  req.user = { id: session.userId };
}

export { authorization };
