import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { FindDeviceByIdDto } from '../../dto/request/device/find-device-by-id.dto';
import { Device } from '../../entity';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindDeviceByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationUserId } from '../../utils';

export class FindDeviceById
  implements UseCase<FindDeviceByIdDto, Either<EntityNotEmpty, Device>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByIdRepository')
    private findDeviceByIdRepository: FindDeviceByIdRepository
  ) {}
  async execute(
    input: FindDeviceByIdDto
  ): Promise<Either<EntityNotEmpty, Device>> {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('id'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredDevice = await this.findDeviceByIdRepository.find(id);

    if (Object.keys(filteredDevice).length < 1) {
      return left(new EntityNotExists('Device'));
    }

    return right(filteredDevice);
  }
}
