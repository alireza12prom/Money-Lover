import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { controller as authController } from './auth';

const app = express();
dotenv.config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Controllers
app.use('/api/v1/auth', authController.router);

// Listening
const PORT = parseInt(process.env.PORT as string) || 3000;
const HOST = (process.env.HOST as string) || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`🚀 server start at: http://${HOST}:${PORT}`);
});

app.disable('x-powered-by');
