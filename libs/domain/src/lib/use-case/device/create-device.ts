import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { CreateDeviceDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  CreateDeviceRepository,
  FindCompanyByIdRepository,
  FindDeviceByNameRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../utils';

export class CreateDevice
  implements
    UseCase<
      CreateDeviceDto,
      Either<EntityNotEmpty | EntityAlreadyExists | EntityNotCreated, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByNameRepository')
    private findDeviceByNameRepository: FindDeviceByNameRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('CreateDeviceRepository')
    private createDeviceRepository: CreateDeviceRepository
  ) {}
  async execute(
    input: CreateDeviceDto
  ): Promise<
    Either<EntityNotEmpty | EntityAlreadyExists | EntityNotCreated, string>
  > {
    const {
      loggedUserId,
      companyId,
      body: { name },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const filteredDevice = await this.findDeviceByNameRepository.find({
      name,
      loggedUserId,
    });

    if (Object.keys(filteredDevice?.id ?? filteredDevice).length > 0) {
      return left(new EntityAlreadyExists('Device'));
    }

    const createdDeviceId = await this.createDeviceRepository.create(input);

    if (Object.keys(createdDeviceId).length < 1) {
      return left(new EntityNotCreated('Device'));
    }

    return right(createdDeviceId);
  }
}
