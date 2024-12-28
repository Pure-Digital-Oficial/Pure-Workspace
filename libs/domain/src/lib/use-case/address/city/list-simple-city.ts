import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CityResponseDto, ListSimpleCityDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindStateByIdRepository,
  FindUserByIdRepository,
  ListSimpleCityRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class ListSimpleCity
  implements
    UseCase<
      ListSimpleCityDto,
      Either<EntityNotEmpty | EntityNotExists, CityResponseDto[]>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindStateByIdRepository')
    private findStateByIdRepository: FindStateByIdRepository,
    @Inject('ListSimpleCityRepository')
    private listSimpleCityRepository: ListSimpleCityRepository
  ) {}
  async execute(
    input: ListSimpleCityDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, CityResponseDto[]>> {
    const { loggedUserId, stateId } = input;

    if (Object.keys(stateId).length < 1) {
      return left(new EntityNotEmpty('State ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredState = await this.findStateByIdRepository.find(stateId);

    if (Object.keys(filteredState?.id ?? filteredState).length < 1) {
      return left(new EntityNotExists('State'));
    }

    const listCity = await this.listSimpleCityRepository.list(input);

    return right(listCity);
  }
}
