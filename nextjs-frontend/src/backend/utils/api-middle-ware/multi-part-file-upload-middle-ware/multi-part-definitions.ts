import { FitEnum } from 'sharp';
import { FileInfo } from 'busboy';
import { NextApiRequest } from 'next';

export const jpegMimeType = 'image/jpeg';
export const pngMimeType = 'image/png';
export const gifMimeType = 'image/gif';
export const webpMimeType = 'image/webp';

export type AllowedFileTypes = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';


export type FitType = keyof FitEnum | undefined;

export interface IUploadedFile extends FileInfo {
  fileContent?: Buffer;
  fieldName: string;
  limitExceeded?: boolean;
  invalidMime?: boolean;
}

export interface IMultiPartRequest extends NextApiRequest {
  files: IUploadedFile[];
}
