import { FindUrlFileDto, FindUrlFileRepository } from '@pure-workspace/domain';

export class FindUrlFileRepositoryImpl implements FindUrlFileRepository {
  async find(input: FindUrlFileDto): Promise<string> {
    const url = `https://${process.env['AWS_S3_BUCKET_NAME']}.s3.amazonaws.com/${input.fileName}`;
    return url;
  }
}
