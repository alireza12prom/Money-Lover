import { WalletRepository } from './repository/wallet';
import { WalletController } from './wallet.controller';
import { prisma } from '../db';
import { Router } from 'express';
import { WalletService } from './wallet.service';

/**
 * initialize repositories
 */
const walletRepository = new WalletRepository(prisma);

/**
 * initialize services
 */
const walletService = new WalletService(walletRepository);

/**
 * create controller(s)
 */
export const controller = new WalletController(Router(), walletService);
controller.setup();
