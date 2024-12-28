import { Injectable } from '@nestjs/common';
import {
  DownloadContentFile,
  DownloadContentFileDto,
} from '@pure-workspace/domain';

@Injectable()
export class DownloadContentFileService {
  constructor(private useCase: DownloadContentFile) {}

  async download(input: DownloadContentFileDto) {
    return await this.useCase.execute(input);
  }
}
