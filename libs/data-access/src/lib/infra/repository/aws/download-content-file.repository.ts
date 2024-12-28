import { GetObjectCommand } from '@aws-sdk/client-s3';
import { DownloadContentFileRepository } from '@pure-workspace/domain';
import { s3Service } from '../../../application';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class DownloadContentFileRepositoryImpl
  implements DownloadContentFileRepository
{
  async download(name: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env['AWS_S3_BUCKET_NAME'],
      Key: name,
    });
    const url = await getSignedUrl(s3Service, command, { expiresIn: 3600 });

    return url;
  }
}
