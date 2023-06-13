import { WalletRepository } from './repository/wallet';
import { WalletController } from './wallet.controller';
import { prisma } from '../../db';
import { Router } from 'express';
import { WalletService } from './wallet.service';
import { BaseLogRepository } from '../../public/repository';

/**
 * initialize repositories
 */
const walletRepository = new WalletRepository(prisma);
const logRepository = new BaseLogRepository(prisma);

/**
 * initialize services
 */
const walletService = new WalletService(walletRepository, logRepository);

/**
 * create controller(s)
 */
export const controller = new WalletController(Router(), walletService);
controller.setup();
