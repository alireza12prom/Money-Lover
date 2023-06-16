import { prisma } from '../../db';
import { Router } from 'express';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository, SessionRepository } from './repository';

/**
 * initialize repositories
 */
const profileRepository = new ProfileRepository(prisma);
const sessionRepository = new SessionRepository(prisma);

/**
 * initialize services
 */
const profileService = new ProfileService(profileRepository, sessionRepository);

/**
 * create controller(s)
 */
export const controller = new ProfileController(Router(), profileService);
controller.setup();
