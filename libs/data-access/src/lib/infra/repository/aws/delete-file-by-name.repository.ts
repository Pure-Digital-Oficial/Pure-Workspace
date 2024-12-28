import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { DeleteFileByNameRepository } from '@pure-workspace/domain';
import { s3Service } from '../../../application';

export class DeleleteFileByNameRepositoryImpl
  implements DeleteFileByNameRepository
{
  async delete(name: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: process.env['AWS_S3_BUCKET_NAME'],
      Key: name,
    });

    await s3Service.send(command);
  }
}
