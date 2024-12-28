import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { FindSchedulesByDeviceIdDto } from '../../dto';
import { Scheduling } from '../../entity';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindDeviceByIdRepository,
  FindSchedulesByDeviceIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationDeviceId, ValidationUserId } from '../../utils';

export class FindSchedulesByDeviceId
  implements
    UseCase<FindSchedulesByDeviceIdDto, Either<EntityNotEmpty, Scheduling[]>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDeviceByIdRepository')
    private findDeviceByIdRepository: FindDeviceByIdRepository,
    @Inject('FindSchedulesByDeviceIdRepository')
    private findSchedulesByDeviceIdRepository: FindSchedulesByDeviceIdRepository
  ) {}
  async execute(
    input: FindSchedulesByDeviceIdDto
  ): Promise<Either<EntityNotEmpty, Scheduling[]>> {
    const { idDevice, loggedUserId } = input;

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

    const filteredSchedules = await this.findSchedulesByDeviceIdRepository.find(
      input
    );

    return right(filteredSchedules);
  }
}
