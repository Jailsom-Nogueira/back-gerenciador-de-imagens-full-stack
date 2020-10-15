import express from 'express';
import { CollectionController } from '../controller/CollectionController';

export const collectionRouter = express.Router();

const collectionController = new CollectionController();

collectionRouter.put('/createCollection', collectionController.createCollection);
collectionRouter.get('/getAllCollections', collectionController.getAllCollections);
collectionRouter.get('/getCollectionDetails', collectionController.getCollectionDetails);