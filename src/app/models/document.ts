import { FileInput } from 'ngx-material-file-input';

export interface IDocument {
  name: string;
  uploaded: Date;
  data: string | Blob;
}

export interface CreateDocument {
  name: string;
  patient: string;
  file: FileInput;
}

export class Document {

  private static b64toBlob (b64Data: string) {
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'application/pdf' });
    return blob;
  }

  static fromApiObject(document: IDocument): IDocument {
    return {
      ...document,
      uploaded: new Date(document.uploaded),
      data: Document.b64toBlob(document.data as string)
    };
  }

}
