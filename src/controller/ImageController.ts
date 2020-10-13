import dayjs from 'dayjs';
import { Request, Response } from 'express';

import { ImageBusiness } from '../business/ImageBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { DeleteImageInputDTO, GetImageInputDTO, ImageInputDTO } from '../model/Image';

export class ImageController {
  
  public deleteImage = async (req: Request, res: Response) => {
    try {
      const input: DeleteImageInputDTO = {
        id: req.query.id as string,
        token: req.headers.authorization as string,
      };

      const deleteImgResult = await new ImageBusiness().deleteImage(input);

      res.status(200).send('Imagem apagada com sucesso');
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  };

  public getImage = async (req: Request, res: Response) => {
    try {
      const input: GetImageInputDTO = {
        id: req.query.id as string,
        token: req.headers.authorization as string,
      };

      const allUserImages = await new ImageBusiness().getImage(input);

      const images = allUserImages.map((image: any) => ({
        id: image.id,
        subtitle: image.subtitle,
        author: image.author,
        date: image.date,
        userId: image.post_userId,
        file: image.file,
        tags: image.tags,
        collection: image.collection,
      }));

      res.status(200).send(images);
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  };

  async createImage(req: Request, res: Response) {
    try {
      const input: ImageInputDTO = {
        token: req.headers.authorization as string,
        subtitle: req.body.subtitle,
        author: req.body.author,
        date: dayjs(req.body.date).format('YYYY-MM-DD'),
        file: req.body.file,
        tags: req.body.tags,
        collection: req.body.collection,
      };

      const imageBusiness = new ImageBusiness();
      await imageBusiness.createImage(input);

      res.status(200).send({
        message: `Imagem "${input.subtitle}" criada com sucesso.`,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
