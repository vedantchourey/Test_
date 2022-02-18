import { NoobApiRouteHandler, PerRequestContext } from '../api-middleware-typings';
import { NextApiRequest, NextApiResponse } from 'next';
import busboy, { FieldInfo, FileInfo, Limits } from 'busboy';
import { Readable } from 'stream';
import sharp from 'sharp';
import { AllowedFileTypes, FitType, gifMimeType, IMultiPartRequest, IUploadedFile, jpegMimeType, pngMimeType, webpMimeType } from './multi-part-definitions';


interface Opts {
  allowedTypes?: AllowedFileTypes[];
  allowedHeight: number;
  allowedWidth: number;
  fit: FitType;
  limits: Limits;
}


function createOutputBuffer(info: busboy.FileInfo, sharpStream: sharp.Sharp, opts: Opts): Promise<Buffer> | null {
  const {fit, allowedHeight, allowedWidth} = opts;
  const resized = sharpStream.resize({fit: fit, height: allowedHeight, width: allowedWidth});
  if (info.mimeType === jpegMimeType) return resized.jpeg({quality: 80}).toBuffer();
  if (info.mimeType === pngMimeType) return resized.png({quality: 80}).toBuffer();
  if (info.mimeType === gifMimeType) return resized.gif().toBuffer();
  if (info.mimeType === webpMimeType) return resized.webp({quality: 80}).toBuffer();
  return null;
}

function createFileFromStream(stream: Readable, outputBuffer: Promise<Buffer> | null, info: busboy.FileInfo, fieldName: string): Promise<IUploadedFile> {

  if (outputBuffer == null) {
    stream.resume();
    console.warn(`Ignoring field ${fieldName} with file name ${info.filename} because of invalid mime type ${info.mimeType}`);
    return Promise.resolve({fieldName, invalidMime: true, ...info});
  }

  return new Promise<IUploadedFile>((resolve) => {
    let limitExceeded = false;

    stream.on('limit', () => {
      limitExceeded = true;
    });

    stream.on('close', () => {
      outputBuffer.then((buffer) => ({...info, fileContent: buffer, fieldName, limitExceeded}))
                  .then((file) => resolve(file));
    });
  });
}

export const createMultiPartMiddleWare = (opts: Opts): NoobApiRouteHandler => {
  return async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext): Promise<void> => {

    return new Promise((resolve, reject) => {

      const bb = busboy({headers: req.headers, limits: opts.limits});
      const allFilePromises: Promise<IUploadedFile>[] = [];

      bb.on('file', (fieldName: string, stream: Readable, info: FileInfo) => {
        const sharpStream = sharp();
        const outputBuffer = createOutputBuffer(info, sharpStream, opts);
        const filePromise = createFileFromStream(stream, outputBuffer, info, fieldName);
        allFilePromises.push(filePromise);
        stream.pipe(sharpStream);
      });

      bb.on('field', (fieldName, val, info: FieldInfo) => {
        console.warn(`Field [${fieldName}]: value: %j`, val);
      });

      bb.on('partsLimit', () => {
        context.middlewareResponse = {status: 400, data: {message: 'parts limit exceeded!'}};
      });

      bb.on('fieldsLimit', () => {
        context.middlewareResponse = {status: 400, data: {message: 'fields limit exceeded!'}};
      });

      bb.on('filesLimit', () => {
        context.middlewareResponse = {status: 400, data: {message: 'files limit exceeded!'}};
      });

      bb.on('error', (error) => {
        console.error(error);
        context.middlewareResponse = {status: 500, data: {message: 'something went wrong!'}};
      });

      bb.on('close', () => {
        Promise.all(allFilePromises)
               .then((files) => {
                 (req as IMultiPartRequest).files = files;
                 resolve();
               })
               .catch((error) => reject(error));
      });
      req.pipe(bb);
    });
  };
};


