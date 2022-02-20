import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { AllowedBuckets } from '../../../models/constants';

export type UploadFileRequest = { files: IUploadedFile[] };

export interface IUploadFileType {
  uploadFile(file: IUploadedFile): Promise<string>;

  readonly bucket: AllowedBuckets;

  getPublicUrl(url: string): Promise<string | null>;

  validate(files: IUploadedFile[]): string | undefined;
}
