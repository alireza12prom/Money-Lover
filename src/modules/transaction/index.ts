import { Router } from 'express';
import { prisma } from '../../db';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

import {
  WalletRepository,
  TransactionRepository,
  TransactionLabelRepository
} from './repository';

/**
 * initialize repositories
 */
const walletRepository = new WalletRepository(prisma);
const transactionRepository = new TransactionRepository(prisma);
const transactionLabelRepo = new TransactionLabelRepository(prisma);

/**
 * initialize services
 */
const transactionService = new TransactionService(
  transactionRepository,
  walletRepository,
  transactionLabelRepo
);

/**
 * create controller(s)
 */
export const controller = new TransactionController(Router(), transactionService);
controller.setup();
