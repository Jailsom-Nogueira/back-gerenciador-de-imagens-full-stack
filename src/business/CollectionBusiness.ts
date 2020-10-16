import { IdGenerator } from '../services/IdGenerator';
import { CollectionDatabase } from '../data/CollectionDatabase';
import { Authenticator } from '../services/Authenticator';
import { 
  CollectionInputDTO, 
  GetCollectionInputDTO, 
  GetCollectionDetailsInputDTO 
} from '../model/Collection';
import { InvalidParameterError } from '../error/InvalidParameterError';
import { NotFound } from '../error/NotFound';
import { Unauthorized } from '../error/Unauthorized';

export class CollectionBusiness {
 
  public async getCollectionDetails(input: GetCollectionDetailsInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }
   
    const collection = await new CollectionDatabase().getCollectionDetails(input.id);
    
    return collection;
  }

  public async getAllCollections(input: GetCollectionInputDTO) {
    const authenticator = new Authenticator();

    const authenticationData = authenticator.verify(input.token);

    const userId = authenticationData.id;
    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }
    
    let result = '';

    if (input.id) {
      result = await new CollectionDatabase().getCollectionById(input.id, userId);

      if (!result.length) {
        throw new NotFound('Not found');
      }
      return result;
    }

    if (!input.id) {
      return (result = await new CollectionDatabase().getAllCollections(userId));

    }

    if (!result) {
      throw new NotFound('Not found');
    }

    return result;
  }

  async createCollection(collection: CollectionInputDTO) {
    const collectionDatabase = new CollectionDatabase();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(collection.token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (
      !collection.title ||
      !collection.subtitle ||
      !collection.date ||
      !collection.file
    ) {
      throw new InvalidParameterError('Missing one or more Parameters');
    }

    if (!userId) {
      throw new Unauthorized('Unauthorized');
    }

    const imageCreated = await collectionDatabase.createCollection(
      id,
      collection.title,
      collection.subtitle,
      collection.date,
      collection.file,
      userId,
    );

    return imageCreated;
  }
}
