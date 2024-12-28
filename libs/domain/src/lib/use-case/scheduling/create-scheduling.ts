import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { CreateSchedulingDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotNegativeNumber,
  StartTimeCannotBeGreaterEndTime,
} from '../../error';
import {
  ConvertStringInTimeRepository,
  CreateSchedulingRepository,
  FindCompanyByIdRepository,
  FindSchedulingByNameRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import {
  ValidationCompanyId,
  ValidationStartEndTime,
  ValidationUserId,
} from '../../utils';

export class CreateScheduling
  implements
    UseCase<
      CreateSchedulingDto,
      Either<
        | EntityNotEmpty
        | EntityNotNegativeNumber
        | EntityAlreadyExists
        | EntityNotCreated
        | EntityNotConverted
        | StartTimeCannotBeGreaterEndTime,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindSchedulingByNameRepository')
    private findSchedulingByNameRepository: FindSchedulingByNameRepository,
    @Inject('ConvertStringInTimeRepository')
    private convertStringInTimeRepository: ConvertStringInTimeRepository,
    @Inject('CreateSchedulingRepository')
    private createSchedulingRepository: CreateSchedulingRepository
  ) {}

  async execute(
    input: CreateSchedulingDto
  ): Promise<
    Either<
      | EntityNotEmpty
      | EntityNotNegativeNumber
      | EntityAlreadyExists
      | EntityNotCreated
      | EntityNotConverted
      | StartTimeCannotBeGreaterEndTime,
      string
    >
  > {
    const {
      loggedUserId,
      companyId,
      body: { name, priority, startTime, endTime, lopping },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (parseInt(priority) < 0) {
      return left(new EntityNotNegativeNumber('Priority'));
    }

    if (Object.keys(startTime).length < 1) {
      return left(new EntityNotEmpty('Start Time'));
    }

    if (Object.keys(endTime).length < 1) {
      return left(new EntityNotEmpty('End Time'));
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

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const filteredScheduling = await this.findSchedulingByNameRepository.find({
      name,
      loggedUserId,
    });

    if (Object.keys(filteredScheduling.id ?? filteredScheduling).length > 0) {
      return left(new EntityAlreadyExists('Scheduling'));
    }

    const createdSchedulingId = await this.createSchedulingRepository.create({
      loggedUserId,
      companyId,
      body: {
        name,
        priority,
        startTime: convertedStartTime,
        endTime: convertedEndTime,
        lopping,
      },
    });

    if (Object.keys(createdSchedulingId).length < 1) {
      return left(new EntityNotCreated('Scheduling'));
    }

    return right(createdSchedulingId);
  }
}
