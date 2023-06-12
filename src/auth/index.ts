import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  SessionRepository,
  UserRepository,
  LogRepository,
  BlackListRepository
} from './repository';
import { prisma } from '../db';
import { Router } from 'express';

/**
 * initialize repositories
 */
const userRepository = new UserRepository(prisma);
const sessionRepository = new SessionRepository(prisma);
const logRepository = new LogRepository(prisma);
const blacklistRepository = new BlackListRepository(prisma);

/**
 * initialize services
 */
const authService = new AuthService(
  userRepository,
  logRepository,
  blacklistRepository,
  sessionRepository
);

/**
 * create controller(s)
 */
export const controller = new AuthController(Router(), authService);
controller.setup();
