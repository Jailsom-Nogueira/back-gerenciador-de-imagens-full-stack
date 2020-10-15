import express from 'express';
import { ImageController } from '../controller/ImageController';

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post('/createImage', imageController.createImage);
imageRouter.get('/getImage', imageController.getImage);
imageRouter.delete('/deleteImage', imageController.deleteImage);

imageRouter.delete('/deleteImage', imageController.deleteImage);
