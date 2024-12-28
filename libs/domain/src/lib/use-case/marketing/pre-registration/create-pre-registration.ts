import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreatePreRegistrationDto } from '../../../dto';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreatePreRegistrationRepository,
  FindPreRegistrationBySendingIdRepository,
  FindSendingByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { compareDates } from '../../../utils';

export class CreatePreRegistration
  implements
    UseCase<
      CreatePreRegistrationDto,
      Either<EntityNotEmpty | EntityNotCreated, string>
    >
{
  constructor(
    @Inject('FindSendingByIdRepository')
    private findSendingByIdRepository: FindSendingByIdRepository,
    @Inject('FindPreRegistrationBySendingIdRepository')
    private findPreRegistrationBySendingIdRepository: FindPreRegistrationBySendingIdRepository,
    @Inject('CreatePreRegistrationRepository')
    private createPreRegistrationRepository: CreatePreRegistrationRepository
  ) {}
  async execute(
    input: CreatePreRegistrationDto
  ): Promise<Either<EntityNotEmpty | EntityNotCreated, string>> {
    const { sendingId } = input;

    if (Object.keys(sendingId).length < 1) {
      return left(new EntityNotEmpty('Sending ID'));
    }

    const sendingResult = await this.findSendingByIdRepository.find(sendingId);

    if (Object.keys(sendingResult?.id ?? sendingResult).length < 1) {
      return left(new EntityNotExists('Sending'));
    }

    const preRegistrationResult =
      await this.findPreRegistrationBySendingIdRepository.find(sendingId);

    if (
      Object.keys(preRegistrationResult?.id ?? preRegistrationResult).length >
        1 &&
      compareDates(preRegistrationResult.createdAt, new Date())
    ) {
      return right(preRegistrationResult.id);
    }

    const createdPreRegistration =
      await this.createPreRegistrationRepository.create(input);

    if (Object.keys(createdPreRegistration).length < 1) {
      return left(new EntityNotCreated('Pre Registration'));
    }

    return right(createdPreRegistration);
  }
}
