import express from 'express';
import { CollectionsImagesController } from '../controller/CollectionsImagesController';

export const collectionsImagesRouter = express.Router();

const collectionsImagesController = new CollectionsImagesController();

collectionsImagesRouter.post('/addImage', collectionsImagesController.addImage);
collectionsImagesRouter.delete('/deleteFromCollection', collectionsImagesController.deleteFromCollection);