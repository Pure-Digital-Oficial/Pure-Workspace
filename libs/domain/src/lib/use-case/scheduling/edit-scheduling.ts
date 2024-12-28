import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { EditSchedulingDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  ConvertStringInTimeRepository,
  EditSchedulingRepository,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import {
  ValidationSchedulingId,
  ValidationStartEndTime,
  ValidationUserId,
} from '../../utils';

export class EditScheduling
  implements UseCase<EditSchedulingDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindSchedulingByIdRepository')
    private findSchedulingByIdRepository: FindSchedulingByIdRepository,
    @Inject('ConvertStringInTimeRepository')
    private convertStringInTimeRepository: ConvertStringInTimeRepository,
    @Inject('EditSchedulingRepository')
    private editSchedulingRepository: EditSchedulingRepository
  ) {}

  async execute(
    input: EditSchedulingDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      id,
      body: { endTime, name, priority, startTime, lopping },
      loggedUserId,
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(endTime).length < 1) {
      return left(new EntityNotEmpty('end time'));
    }

    if (Object.keys(startTime).length < 1) {
      return left(new EntityNotEmpty('start time'));
    }

    if (Object.keys(priority).length < 1) {
      return left(new EntityNotEmpty('priority'));
    }

    const convertedStartTime = await this.convertStringInTimeRepository.convert(
      `${startTime}`
    );
    const convertedEndTime = await this.convertStringInTimeRepository.convert(
      `${endTime}`
    );

    const startEndTimeValidation = await ValidationStartEndTime(
      convertedStartTime,
      convertedEndTime
    );

    if (startEndTimeValidation.isLeft()) {
      return left(startEndTimeValidation.value);
    }
    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const schedulingValidation = await ValidationSchedulingId(
      id,
      this.findSchedulingByIdRepository
    );

    if (schedulingValidation.isLeft()) {
      return left(schedulingValidation.value);
    }

    const editedScheduling = await this.editSchedulingRepository.edit({
      body: {
        name,
        priority,
        startTime: convertedStartTime,
        endTime: convertedEndTime,
        lopping,
      },
      id,
      loggedUserId,
    });

    return right(editedScheduling);
  }
}
