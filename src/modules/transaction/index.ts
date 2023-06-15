import { Router } from 'express';
import { prisma } from '../../db';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { WalletRepository, TransactionRepository } from './repository';
import { LabelRepository } from '../label/repository';

/**
 * initialize repositories
 */
const walletRepository = new WalletRepository(prisma);
const transactionRepository = new TransactionRepository(prisma);
const labelRepository = new LabelRepository(prisma);

/**
 * initialize services
 */
const transactionService = new TransactionService(
  transactionRepository,
  walletRepository,
  labelRepository
);

/**
 * create controller(s)
 */
export const controller = new TransactionController(Router(), transactionService);
controller.setup();
