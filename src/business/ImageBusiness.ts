import { IdGenerator } from '../services/IdGenerator';
import { ImageDatabase } from '../data/ImageDatabase';
import { Authenticator } from '../services/Authenticator';
import { GetImageInputDTO, ImageInputDTO } from '../model/Image';
import { InvalidParameterError } from '../error/InvalidParameterError';
import { Unauthorized } from '../error/Unauthorized';
import { NotFound } from '../error/NotFound';

export class ImageBusiness {
  public async getImage(input: GetImageInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    !input.id && (input.id = '');

    const result = await new ImageDatabase().getImage(
      userId,
      input.id as string,
    );
    if (!result) {
      throw new NotFound('Not found');
    }

    return result;
  }

  async createImage(image: ImageInputDTO) {
    const imageDatabase = new ImageDatabase();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(image.token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (
      !image.subtitle ||
      !image.author ||
      !image.date ||
      !image.file ||
      !image.tags ||
      !image.collection
    ) {
      throw new InvalidParameterError('Missing one or more Parameters');
    }

    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    const imageCreated = await imageDatabase.createImage(
      id,
      image.subtitle,
      image.author,
      image.date,
      image.file,
      image.tags,
      image.collection,
      userId,
    );

    return imageCreated;
  }
}
