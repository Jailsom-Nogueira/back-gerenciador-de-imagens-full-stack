import dayjs from 'dayjs';
import { Request, Response } from 'express';

import { CollectionBusiness } from '../business/CollectionBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { CollectionInputDTO, GetCollectionInputDTO, GetCollectionDetailsInputDTO } from '../model/Collection';

export class CollectionController {

  public getCollectionDetails = async (req: Request, res: Response) => {
    try {
      const input: GetCollectionDetailsInputDTO = {
        id: req.query.id as string,
        token: req.headers.authorization as string,
      };
      
      const collectionDetails = await new CollectionBusiness().getCollectionDetails(input);
   
      const collections = collectionDetails.map((collection: any) => ({
        id: collection.id,
        date: collection.date,
        collectionId: collection.collection_id,
        imageId: collection.image_id,
      }));

      res.status(200).send(collections);
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  };

  public getAllCollections = async (req: Request, res: Response) => {
    try {
      const input: GetCollectionInputDTO = {
        id: req.query.id as string,
        token: req.headers.authorization as string,
      };
      
      const allUserCollection = await new CollectionBusiness().getAllCollections(input);
   
      const collections = allUserCollection.map((collection: any) => ({
        id: collection.id,
        title: collection.title,
        subtitle: collection.subtitle,
        date: collection.date,
        userId: collection.post_userId,
        file: collection.file,
      }));

      res.status(200).send(collections);
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  };

  async createCollection(req: Request, res: Response) {
    try {
      const input: CollectionInputDTO = {
        token: req.headers.authorization as string,
        title: req.body.title,
        subtitle: req.body.subtitle,
        date: dayjs(req.body.date).format('YYYY-MM-DD'),
        file: req.body.file,
      };

      const collectionBusiness = new CollectionBusiness();
      await collectionBusiness.createCollection(input);

      res.status(200).send({
        message: `Coleção "${input.title}" criada com sucesso.`,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
