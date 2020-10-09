import { IdGenerator } from '../services/IdGenerator';
import { ImageDatabase } from '../data/ImageDatabase';
import { Authenticator } from '../services/Authenticator';
import { DeleteImageInputDTO, GetImageInputDTO, ImageInputDTO } from '../model/Image';
import { InvalidParameterError } from '../error/InvalidParameterError';
import { Unauthorized } from '../error/Unauthorized';
import { NotFound } from '../error/NotFound';

export class ImageBusiness {
  public async deleteImage(input: DeleteImageInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    const checkImage = await new ImageBusiness().getImage(input);

    if (!checkImage.length) {
      throw new NotFound('Not found');
    }

    const result = await new ImageDatabase().deleteImageById(input.id, userId);

    return result;
  }

  public async getImage(input: GetImageInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    let result = '';

    if (input.id) {
      result = await new ImageDatabase().getImageById(input.id, userId);

      if (!result.length) {
        throw new NotFound('Not found');
      }
      return result;
    }

    if (!input.id) {
      return (result = await new ImageDatabase().getImage(userId));
    }

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
