import { Injectable } from '@nestjs/common';
import {
  DetailsContentFile,
  DetailsContentFileDto,
} from '@pure-workspace/domain';

@Injectable()
export class DetailsContentFileService {
  constructor(private useCase: DetailsContentFile) {}

  async details(input: DetailsContentFileDto) {
    return await this.useCase.execute(input);
  }
}
