import { GetImageInputDTO } from '../model/Image';
import { BaseDatabase } from './BaseDatabase';

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = '_images';

  public async getImage(userId: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(ImageDatabase.TABLE_NAME)
      .where({ user_id: userId });
    return result;
  }

  public async getImageById(imageId: string, userId: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(ImageDatabase.TABLE_NAME)
      .where({ id: imageId })
      .and.where({ user_id: userId });
    return result;
  }

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: string,
    file: string,
    tags: string,
    collection: string,
    userId: string,
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          subtitle,
          author,
          date,
          file,
          tags,
          collection,
          user_id: userId,
        })
        .into(ImageDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
