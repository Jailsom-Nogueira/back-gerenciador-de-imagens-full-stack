export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private date: Date,
    private file: string,
    private tags: string,
    private collection: string,
  ) {}

  getId() {
    return this.id;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getAuthor() {
    return this.author;
  }

  getDate() {
    return this.date;
  }

  getFile() {
    return this.file;
  }

  getTags() {
    return this.tags;
  }

  getCollection() {
    return this.collection;
  }

  setId(id: string) {
    this.id = id;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setAuthor(author: string) {
    this.author = author;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setFile() {
    return this.file;
  }

  setTags() {
    return this.tags;
  }

  setCollection() {
    return this.collection;
  }
  static toImageModel(image: any): Image {
    return new Image(
      image.id,
      image.subtitle,
      image.author,
      image.date,
      image.file,
      image.tags,
      image.collection,
    );
  }
}

export interface ImageInputDTO {
  token: string;
  subtitle: string;
  author: string;
  date: string;
  file: string;
  tags: string;
  collection: string;
}

export interface GetImageInputDTO {
  id?: string;
  token: string;
}
