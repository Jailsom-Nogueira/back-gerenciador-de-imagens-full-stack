import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';

import { AddressInfo } from 'net';
import { userRouter } from './routes/userRouter';
import { imageRouter } from './routes/imageRouter';
import { fileRouter } from './routes/fileRouter';
import { collectionRouter } from './routes/collectionRouter';

dotenv.config();
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use('/user', userRouter);
app.use('/image', imageRouter);
app.use('/files', fileRouter);
app.use('/collection', collectionRouter);

const server = app.listen(process.env.PORT, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em ${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
// const server = app.listen(3003, () => {
//   if (server) {
//     const address = server.address() as AddressInfo;
//     console.log(`Servidor rodando em http://localhost:${address.port}`);
//   } else {
//     console.error(`Falha ao rodar o servidor.`);
//   }
// });