export class Collection {
  constructor(
    private id: string,
    private title: string,
    private subtitle: string,
    private date: Date,
    private file: string,
  ) {}

  getId() {
    return this.id;
  }

  
  getTitle() {
    return this.title;
  }

  getSubtitle() {
    return this.subtitle;
  }

  getDate() {
    return this.date;
  }

  getFile() {
    return this.file;
  }

  setId(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setFile() {
    return this.file;
  }

  // static toImageModel(image: any): Image {
  //   return new Image(
  //     image.id,
  //     image.subtitle,
  //     image.author,
  //     image.date,
  //     image.file,
  //     image.tags,
  //     image.collection,
  //   );
  // }
}

export interface CollectionInputDTO {
  token: string;
  title: string;
  subtitle: string;
  date: string;
  file: string;
}

export interface GetCollectionInputDTO {
  id?: string;
  token: string;
}

export interface GetCollectionDetailsInputDTO {
  id: string;
  token: string;
}