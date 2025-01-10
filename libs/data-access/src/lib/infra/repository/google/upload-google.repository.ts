import { Storage } from '@google-cloud/storage';
import {
  UploadContentFileDto,
  UploadContentFileRepository,
} from '@pure-workspace/domain';

export class UploadContentFileInGoogleRepositoryImpl
  implements UploadContentFileRepository
{
  async upload(input: UploadContentFileDto): Promise<string> {
    const { file, bucket, key } = input;
    const credentials = JSON.parse(
      process.env['NX_PUBLIC_CLOUD_CREDENTIALS'] || '{}'
    );
    const storage = new Storage({ credentials });
    const cloudBucket = storage.bucket(bucket);

    const blob = cloudBucket.file(key);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket}/${key}`;
          resolve(publicUrl);
        })
        .on('error', (err) => reject(err))
        .end(file.buffer);
    });
  }
}
