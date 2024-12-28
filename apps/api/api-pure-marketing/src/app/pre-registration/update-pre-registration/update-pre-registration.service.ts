import { Injectable } from '@nestjs/common';
import {
  UpdatePreRegistration,
  UpdatePreRegistrationDto,
} from '@pure-workspace/domain';

@Injectable()
export class UpdatePreRegistrationService {
  constructor(private useCase: UpdatePreRegistration) {}

  async update(input: UpdatePreRegistrationDto) {
    return await this.useCase.execute(input);
  }
}
