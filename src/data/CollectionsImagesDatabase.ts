import { BaseDatabase } from './BaseDatabase';

export class CollectionsImagesDatabase extends BaseDatabase {
  private static TABLE_NAME = '_collections_images';

  public async deleteFromCollection(collectionId: string, imageId: string ): Promise<any> {

    const result = await this.getConnection()
      .delete('*')
      .from(CollectionsImagesDatabase.TABLE_NAME)
      .where({ collection_id: collectionId })
      .and.where({ image_id: imageId });
    return result;
  }

  public async addImage(
    id: string,
    collectionId: string,
    imageId: string,
    date: string,
    userId: string,
  ): Promise<void> {
    try {
  
      await this.getConnection()
        .insert({
          id,
          collection_id: collectionId,
          image_id: imageId,
          date,
          user_id: userId,
        })
        .into(CollectionsImagesDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
