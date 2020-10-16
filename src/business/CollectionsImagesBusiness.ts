import { IdGenerator } from '../services/IdGenerator';
import { CollectionsImagesDatabase } from '../data/CollectionsImagesDatabase';
import { Authenticator } from '../services/Authenticator';
import { 
  CollectionsImagesInputDTO,
  DeleteFromCollectionInputDTO 
} from '../model/CollectionsImages';
import { InvalidParameterError } from '../error/InvalidParameterError';
import { Unauthorized } from '../error/Unauthorized';

export class CollectionsImagesBusiness {

  public async deleteFromCollection(input: DeleteFromCollectionInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    const result = await new CollectionsImagesDatabase().deleteFromCollection(input.collectionId,input.imageId);

    return result;
  }

  async addImage(input: CollectionsImagesInputDTO) {
    const collectionsImagesDatabase = new CollectionsImagesDatabase();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(input.token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (
      !input.collectionId ||
      !input.imageId ||
      !input.date 
    ) {
      throw new InvalidParameterError('Missing one or more Parameters');
    }

    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    const imageAdded = await collectionsImagesDatabase.addImage(
      id,
      input.collectionId,
      input.imageId,
      input.date,
      userId,
    );

    return imageAdded;
  }
}
