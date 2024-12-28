import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import {
  ListSimpleCountryDto,
  ListSimpleCountryResponseDto,
} from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindUserByIdRepository,
  ListSimpleCountryRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class ListSimpleCountry
  implements
    UseCase<
      ListSimpleCountryDto,
      Either<EntityNotEmpty, ListSimpleCountryResponseDto[]>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListSimpleCountryRepository')
    private listSimpleCountryRepository: ListSimpleCountryRepository
  ) {}
  async execute(
    input: ListSimpleCountryDto
  ): Promise<Either<EntityNotEmpty, ListSimpleCountryResponseDto[]>> {
    const { loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const listCountry = await this.listSimpleCountryRepository.list();

    return right(listCountry);
  }
}
