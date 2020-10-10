import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import { AddressInfo } from 'net';
import { userRouter } from './routes/userRouter';
import { imageRouter } from './routes/imageRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/image', imageRouter);

const server = app.listen(process.env.PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em ${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
