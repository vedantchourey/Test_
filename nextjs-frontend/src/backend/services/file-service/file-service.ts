import { IFileType, UploadFileRequest } from './i-file-type';
import { ServiceResponse } from '../common/contracts/service-response';
import { IFileResponse } from './i-file-response';
import { IUploadedFile } from '../../utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';


export async function uploadFile(files: IUploadedFile[], fileType: IFileType): Promise<ServiceResponse<UploadFileRequest, IFileResponse>> {
  const error = fileType.validate(files);
  if (error != null) return {errors: {files: error}};
  const supabaseUrl = await fileType.uploadFile(files[0]);
  const publicUrl = await fileType.getPublicUrl(supabaseUrl);
  return {
    data: {
      publicUrl,
      url: supabaseUrl,
      bucket: fileType.bucket
    }
  }
}



