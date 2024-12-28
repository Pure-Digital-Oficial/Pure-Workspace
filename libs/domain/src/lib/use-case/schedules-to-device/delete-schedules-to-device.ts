import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeleteSchedulesToDeviceDto } from '../../dto';
import { EntityNotDeleted, EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  DeleteSchedulingToDeviceRepository,
  FindDeviceByIdRepository,
  FindSchedulingByIdRepository,
  FindSchedulingToDeviceByIdsRepository,
  FindUserByIdRepository,
} from '../../repository';
import {
  ValidationDeviceId,
  ValidationSchedulingId,
  ValidationUserId,
} from '../../utils';

export class DeleteSchedulesToDevice
  implements
    UseCase<DeleteSchedulesToDeviceDto, Either<EntityNotEmpty, string[]>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByIdRepository')
    private findDeviceByIdRepository: FindDeviceByIdRepository,
    @Inject('FindSchedulingByIdRepository')
    private findSchedulingByIdRepository: FindSchedulingByIdRepository,
    @Inject('FindSchedulingToDeviceByIdsRepository')
    private findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository,
    @Inject('DeleteSchedulingToDeviceRepository')
    private deleteSchedulingToDeviceRepository: DeleteSchedulingToDeviceRepository
  ) {}

  async execute(
    input: DeleteSchedulesToDeviceDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { idDevice, loggedUserId, schedulesIds } = input;

    if (schedulesIds.length < 1) {
      return left(new EntityNotEmpty('Schedules'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const deviceValidation = await ValidationDeviceId(
      idDevice,
      this.findDeviceByIdRepository
    );

    if (deviceValidation.isLeft()) {
      return left(deviceValidation.value);
    }
    const ids = [];

    for (const schedulingId of schedulesIds) {
      const schedulingValidation = await ValidationSchedulingId(
        schedulingId,
        this.findSchedulingByIdRepository
      );

      if (schedulingValidation.isLeft()) {
        return left(schedulingValidation.value);
      }

      const filteredSchedulingToDevice =
        await this.findSchedulingToDeviceByIdsRepository.find({
          idDevice,
          idScheduling: schedulingId,
        });

      if (Object.keys(filteredSchedulingToDevice).length < 1) {
        return left(new EntityNotExists('Scheduling'));
      }

      const deletedScheduling =
        await this.deleteSchedulingToDeviceRepository.delete({
          idDevice,
          schedulingId,
        });

      if (Object.keys(deletedScheduling).length < 1) {
        return left(new EntityNotDeleted('Scheduling'));
      }
      ids.push(deletedScheduling);
    }

    return right(ids);
  }
}
