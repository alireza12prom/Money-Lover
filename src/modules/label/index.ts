import { Router } from 'express';
import { prisma } from '../../db';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { LabelRepository } from './repository';

/**
 * initialize repositories
 */
const labelRepository = new LabelRepository(prisma);

/**
 * initialize services
 */
const labelService = new LabelService(labelRepository);

/**
 * create controller(s)
 */
export const controller = new LabelController(Router(), labelService);
controller.setup();
