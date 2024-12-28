import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { MoveSchedulesToAnotherDeviceDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotMoved,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindDeviceByIdRepository,
  FindSchedulingByIdRepository,
  FindSchedulingToDeviceByIdsRepository,
  FindUserByIdRepository,
  MoveSchedulingToAnotherDeviceRepository,
} from '../../repository';
import {
  ValidationDeviceId,
  ValidationSchedulingId,
  ValidationUserId,
} from '../../utils';

export class MoveSchedulesToAnotherDevice
  implements
    UseCase<MoveSchedulesToAnotherDeviceDto, Either<EntityNotEmpty, string[]>>
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
    @Inject('MoveSchedulingToAnotherDeviceRepository')
    private moveSchedulingToAnotherDeviceRepository: MoveSchedulingToAnotherDeviceRepository
  ) {}
  async execute(
    input: MoveSchedulesToAnotherDeviceDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { loggedUserId, newDeviceId, oldDeviceId, schedulesIds } = input;
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

    const oldDeviceValidation = await ValidationDeviceId(
      oldDeviceId,
      this.findDeviceByIdRepository
    );

    if (oldDeviceValidation.isLeft()) {
      return left(oldDeviceValidation.value);
    }

    const newDeviceValidation = await ValidationDeviceId(
      newDeviceId,
      this.findDeviceByIdRepository
    );

    if (newDeviceValidation.isLeft()) {
      return left(newDeviceValidation.value);
    }
    const ids = [];
    for (const scheduleId of schedulesIds) {
      const schedulingValidation = await ValidationSchedulingId(
        scheduleId,
        this.findSchedulingByIdRepository
      );

      if (schedulingValidation.isLeft()) {
        return left(schedulingValidation.value);
      }

      const filteredSchedulingToOldDevice =
        await this.findSchedulingToDeviceByIdsRepository.find({
          idDevice: oldDeviceId,
          idScheduling: scheduleId,
        });

      if (Object.keys(filteredSchedulingToOldDevice).length < 1) {
        return left(new EntityNotExists('Scheduling in old device'));
      }

      const filteredSchedulingTNewDevice =
        await this.findSchedulingToDeviceByIdsRepository.find({
          idDevice: newDeviceId,
          idScheduling: scheduleId,
        });

      if (Object.keys(filteredSchedulingTNewDevice).length > 0) {
        return left(new EntityAlreadyExists('Scheduling in new device'));
      }

      const movedScheduling =
        await this.moveSchedulingToAnotherDeviceRepository.move({
          loggedUserId,
          newDeviceId,
          oldDeviceId,
          schedulingId: scheduleId,
        });

      if (Object.keys(movedScheduling).length < 1) {
        return left(new EntityNotMoved('Scheduling'));
      }

      ids.push(movedScheduling);
    }

    return right(ids);
  }
}
