import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeleteDeviceDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  DeleteDeviceRepository,
  FindDeviceByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationDeviceId, ValidationUserId } from '../../utils';

export class DeleteDevice
  implements UseCase<DeleteDeviceDto, Either<EntityNotEmpty, void>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByIdRepository')
    private findDeviceByIdRepository: FindDeviceByIdRepository,
    @Inject('DeleteDeviceRepository')
    private deleteDeviceRepository: DeleteDeviceRepository
  ) {}
  async execute(input: DeleteDeviceDto): Promise<Either<EntityNotEmpty, void>> {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const deviceValidation = await ValidationDeviceId(
      id,
      this.findDeviceByIdRepository
    );

    if (deviceValidation.isLeft()) {
      return left(deviceValidation.value);
    }

    await this.deleteDeviceRepository.delete(input);

    return right(undefined);
  }
}
