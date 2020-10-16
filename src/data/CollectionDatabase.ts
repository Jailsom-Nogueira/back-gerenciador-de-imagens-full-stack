import { BaseDatabase } from './BaseDatabase';

export class CollectionDatabase extends BaseDatabase {
  private static TABLE_NAME = '_collections';

  public async getAllCollections(userId: string): Promise<any> {

    const result = await this.getConnection()
      .select('*')
      .from(CollectionDatabase.TABLE_NAME)
      .where({ user_id: userId });
    return result;
  }

  public async getCollectionById(collectionId: string, userId: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(CollectionDatabase.TABLE_NAME)
      .where({ id: collectionId })
      .and.where({ user_id: userId });
    return result;
  }

  public async getCollectionDetails(collectionId: string) {
 
    try {
      const result = await this.getConnection().raw(`
        SELECT _collections_images.*, _images.* 
        FROM _images 
        JOIN _collections_images ON _images.id = _collections_images.image_id
        AND _collections_images.collection_id = '${collectionId}';
        `);

      return result[0];
  
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  }

  public async createCollection(
    id: string,
    title: string,
    subtitle: string,
    date: string,
    file: string,
    userId: string,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          subtitle,
          date,
          file,
          user_id: userId,
        })
        .into(CollectionDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
