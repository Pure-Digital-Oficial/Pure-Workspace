import { Injectable } from '@nestjs/common';
import {
  ChangeProductStatus,
  ChangeProductStatusDto,
} from '@pure-workspace/domain';

@Injectable()
export class ChangeProductStatusService {
  constructor(private useCase: ChangeProductStatus) {}

  async change(input: ChangeProductStatusDto) {
    return this.useCase.execute(input);
  }
}
