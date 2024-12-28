import { PutObjectCommand } from '@aws-sdk/client-s3';
import {
  UploadContentFileDto,
  UploadContentFileRepository,
} from '@pure-workspace/domain';
import { s3Service } from '../../../application';

export class UploadContentFileRepositoryImpl
  implements UploadContentFileRepository
{
  async upload(input: UploadContentFileDto): Promise<string> {
    const { file, bucket, key } = input;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Service.send(command);

    return `https://${bucket}.s3.${process.env['AWS_REGION']}.amazonaws.com/${key}`;
  }
}
