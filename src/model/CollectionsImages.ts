export class CollectionsImages {
  constructor(
    private id: string,
    private collectionId: string,
    private imageId: string,
    private date: Date,
  ) {}

  getId() {
    return this.id;
  }

  getCollectionId() {
    return this.collectionId;
  }

  getImageId() {
    return this.imageId;
  }

  getDate() {
    return this.date;
  }

  setId(id: string) {
    this.id = id;
  }

  setCollectionId(collectionId: string) {
    this.collectionId = collectionId;
  }

  setImageId(imageId: string) {
    this.imageId = imageId;
  }

  setDate(date: Date) {
    this.date = date;
  }
}

export interface CollectionsImagesInputDTO {
  token: string;
  collectionId: string;
  imageId: string;
  date: string;
}

export interface DeleteFromCollectionInputDTO {
  token: string;
  collectionId: string;
  imageId: string;
}
