import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeleteSchedulingDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import {
  DeleteSchedulingRepository,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationSchedulingId, ValidationUserId } from '../../utils';

export class DeleteScheduling
  implements UseCase<DeleteSchedulingDto, Either<EntityNotEmpty, void>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindSchedulingByIdRepository')
    private findSchedulingByIdRepository: FindSchedulingByIdRepository,
    @Inject('DeleteSchedulingRepository')
    private deleteSchedulingRepository: DeleteSchedulingRepository
  ) {}
  async execute(
    input: DeleteSchedulingDto
  ): Promise<Either<EntityNotEmpty, void>> {
    const { id, loggedUserId } = input;

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

    await this.deleteSchedulingRepository.delete(input);
    return right(undefined);
  }
}
