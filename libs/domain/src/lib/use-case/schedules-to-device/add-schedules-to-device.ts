import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { AddSchedulesToDeviceDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  AddSchedulingToDeviceRepository,
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

export class AddSchedulesToDevice
  implements UseCase<AddSchedulesToDeviceDto, Either<EntityNotEmpty, string[]>>
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
    @Inject('AddSchedulingToDeviceRepository')
    private addSchedulingToDeviceRepository: AddSchedulingToDeviceRepository
  ) {}
  async execute(
    input: AddSchedulesToDeviceDto
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
    const ids = [];
    const deviceValidation = await ValidationDeviceId(
      idDevice,
      this.findDeviceByIdRepository
    );

    if (deviceValidation.isLeft()) {
      return left(deviceValidation.value);
    }

    for (const scheduleId of schedulesIds) {
      const schedulingValidation = await ValidationSchedulingId(
        scheduleId,
        this.findSchedulingByIdRepository
      );

      if (schedulingValidation.isLeft()) {
        return left(schedulingValidation.value);
      }

      const filteredSchedulingToDevice =
        await this.findSchedulingToDeviceByIdsRepository.find({
          idDevice,
          idScheduling: scheduleId,
        });

      if (Object.keys(filteredSchedulingToDevice).length > 0) {
        return left(new EntityAlreadyExists('Scheduling'));
      }

      const createdScheduling = await this.addSchedulingToDeviceRepository.add({
        idDevice: idDevice,
        idScheduing: scheduleId,
        loggedUserId: loggedUserId,
      });

      if (Object.keys(createdScheduling).length < 1) {
        return left(new EntityNotCreated('Scheduling in Device'));
      }

      ids.push(createdScheduling);
    }

    return right(ids);
  }
}
