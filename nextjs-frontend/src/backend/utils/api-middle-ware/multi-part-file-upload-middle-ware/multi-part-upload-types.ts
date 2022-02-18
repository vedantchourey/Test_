import { createMultiPartMiddleWare } from './multi-part-form-upload';

export const avatarImageMiddleware = createMultiPartMiddleWare({
  fit: 'inside',
  allowedWidth: 156,
  allowedHeight: 156,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  limits: {
    fileSize: 1024 * 1024 // 1 MB in bytes
  }
});
