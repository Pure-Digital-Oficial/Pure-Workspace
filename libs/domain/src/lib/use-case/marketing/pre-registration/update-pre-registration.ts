import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { UpdatePreRegistrationDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty, EntityNotExists } from '../../../error';
import {
  FindPreRegistrationByIdRepository,
  UpdatePreRegistrationRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';

export class UpdatePreRegistration
  implements UseCase<UpdatePreRegistrationDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindPreRegistrationByIdRepository')
    private findPreRegistartionByIdRepository: FindPreRegistrationByIdRepository,
    @Inject('UpdatePreRegistrationRepository')
    private updatePreRegistrationRepostiory: UpdatePreRegistrationRepository
  ) {}
  async execute(
    input: UpdatePreRegistrationDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { id, branchOfTheCompany } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

    if (Object.keys(branchOfTheCompany).length < 1) {
      return left(new EntityNotEmpty('Branch of the company'));
    }

    const filteredPreRegistration =
      await this.findPreRegistartionByIdRepository.find(id);

    if (
      Object.keys(filteredPreRegistration?.id ?? filteredPreRegistration)
        .length < 1
    ) {
      return left(new EntityNotExists('Pre Registration'));
    }

    const updatePreRegistration =
      await this.updatePreRegistrationRepostiory.update(input);

    if (Object.keys(updatePreRegistration).length < 1) {
      return left(new EntityNotEdit('Pre Registration'));
    }

    return right(updatePreRegistration);
  }
}
