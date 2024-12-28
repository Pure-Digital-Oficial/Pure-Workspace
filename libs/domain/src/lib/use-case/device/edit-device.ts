import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { EditDeviceDto } from '../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  EditDeviceRepository,
  FindDeviceByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationDeviceId, ValidationUserId } from '../../utils';

export class EditDevice
  implements UseCase<EditDeviceDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByIdRepository')
    private findDeviceByIdRepository: FindDeviceByIdRepository,
    @Inject('EditDeviceRepository')
    private editDeviceRepository: EditDeviceRepository
  ) {}
  async execute(input: EditDeviceDto): Promise<Either<EntityNotEmpty, string>> {
    const { id, loggedUserId, name } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

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

    const editDeviceId = await this.editDeviceRepository.edit(input);

    if (Object.keys(editDeviceId).length < 1) {
      return left(new EntityNotEdit('device'));
    }

    return right(editDeviceId);
  }
}
