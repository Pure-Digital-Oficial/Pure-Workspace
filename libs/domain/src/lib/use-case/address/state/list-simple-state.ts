import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListSimpleStateDto, ListSimpleStateResponseDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import {
  FindCountryByIdRepository,
  FindUserByIdRepository,
  ListSimpleStateRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class ListSimpleState
  implements
    UseCase<
      ListSimpleStateDto,
      Either<EntityNotEmpty, ListSimpleStateResponseDto[]>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCountryByIdRepository')
    private findCountryByIdRepository: FindCountryByIdRepository,
    @Inject('ListSimpleStateRepository')
    private listSimpleStateRepository: ListSimpleStateRepository
  ) {}
  async execute(
    input: ListSimpleStateDto
  ): Promise<Either<EntityNotEmpty, ListSimpleStateResponseDto[]>> {
    const { countryId, loggedUserId } = input;

    if (Object.keys(countryId).length < 1) {
      return left(new EntityNotEmpty('Country ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredCountry = await this.findCountryByIdRepository.find(
      countryId
    );

    if (Object.keys(filteredCountry?.id ?? filteredCountry).length < 1) {
      return left(new EntityNotExists('Country'));
    }

    const listState = await this.listSimpleStateRepository.list(input);

    return right(listState);
  }
}
