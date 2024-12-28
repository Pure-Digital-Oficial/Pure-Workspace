import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ListSchedulesDto, ListSchedulesReponseDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListSchedulesRepository,
} from '../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../utils';

export class ListSchedules
  implements
    UseCase<ListSchedulesDto, Either<EntityNotEmpty, ListSchedulesReponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('ListSchedulesRepository')
    private listSchedulingRepository: ListSchedulesRepository
  ) {}
  async execute(
    input: ListSchedulesDto
  ): Promise<Either<EntityNotEmpty, ListSchedulesReponseDto>> {
    const { loggedUserId, companyId } = input;

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

    const resultScheduling = await this.listSchedulingRepository.list(input);

    return right(resultScheduling);
  }
}
