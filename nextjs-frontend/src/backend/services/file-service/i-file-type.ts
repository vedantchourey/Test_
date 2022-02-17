import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';

export type UploadFileRequest = { files: IUploadedFile[] };

export interface IFileType {
  uploadFile(file: IUploadedFile): Promise<string>;

  readonly bucket: string;

  getPublicUrl(url: string): Promise<string | null>;

  validate(files: IUploadedFile[]): string | undefined;
}
