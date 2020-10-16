import dayjs from 'dayjs';
import { Request, Response } from 'express';

import { CollectionsImagesBusiness } from '../business/CollectionsImagesBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { CollectionsImagesInputDTO, DeleteFromCollectionInputDTO } from '../model/CollectionsImages';

export class CollectionsImagesController {

  public deleteFromCollection = async (req: Request, res: Response) => {
    try {
      const input: DeleteFromCollectionInputDTO = {
        token: req.headers.authorization as string,
        collectionId: req.query.collectionId as string,
        imageId: req.query.imageId as string,
      };

      await new CollectionsImagesBusiness().deleteFromCollection(input);

      res.status(200).send('Imagem apagada da coleção com sucesso');
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  };

  async addImage(req: Request, res: Response) {
    try {
      const input: CollectionsImagesInputDTO = {
        token: req.headers.authorization as string,
        collectionId: req.body.collectionId,
        imageId: req.body.imageId,
        date: dayjs(req.body.date).format('YYYY-MM-DD'),
      };

      const collectionsImagesBusiness = new CollectionsImagesBusiness();
      await collectionsImagesBusiness.addImage(input);

      res.status(200).send({
        message: `Imagem adicionada com sucesso.`,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
