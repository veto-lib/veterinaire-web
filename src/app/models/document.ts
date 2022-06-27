export interface IDocument {
  name: string;
  uploaded: Date;
  url: string;
}

export class Document {

  static fromApiObject(document: IDocument): IDocument {
    return {
      ...document,
      uploaded: new Date(document.uploaded)
    };
  }

}
