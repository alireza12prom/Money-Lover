import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import config from './config/index.json';
import {
  authController,
  walletController,
  transController,
  labelController,
  profileController
} from './modules';

const app = express();
dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Controllers
app.use('/api/v1/auth', authController.router);
app.use('/api/v1/wallet', walletController.router);
app.use('/api/v1/transaction', transController.router);
app.use('/api/v1/label', labelController.router);
app.use('/api/v1/profile', profileController.router);

// Listening
const PORT = config.Server.PORT;
const HOST = config.Server.HOST;
app.listen(PORT, HOST, () => {
  console.log(`🚀 server start at: http://${HOST}:${PORT}`);
});

app.disable('x-powered-by');
