import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateContactUsDto } from '../../../dto';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreateContactUsRepository,
  FindAppByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export class CreateContactUs
  implements UseCase<CreateContactUsDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('CreateContactUsRepository')
    private createContactUsRepository: CreateContactUsRepository
  ) {}
  async execute(
    input: CreateContactUsDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      appId,
      body: { description, email, name, number },
    } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('App ID'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('Email'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(number).length < 1) {
      return left(new EntityNotEmpty('Number'));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app ID'));
    }

    const createdContact = await this.createContactUsRepository.create(input);

    if (Object.keys(createdContact).length < 1) {
      return left(new EntityNotCreated('Contact'));
    }

    return right(createdContact);
  }
}
