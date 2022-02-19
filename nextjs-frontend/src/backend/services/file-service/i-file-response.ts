import { AllowedBuckets } from '../../../models/constants';

export interface IFileResponse {
  bucket: AllowedBuckets;
  url: string;
  publicUrl: string | null;
}
