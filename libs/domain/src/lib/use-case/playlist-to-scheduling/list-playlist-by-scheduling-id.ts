import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import {
  ListPlaylistBySchedulingIdDto,
  ListPlaylistResponseDto,
} from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  ListPlaylistBySchedulingIdRepository,
} from '../../repository';
import { ValidationSchedulingId, ValidationUserId } from '../../utils';

export class ListPlaylistBySchedulingId
  implements
    UseCase<
      ListPlaylistBySchedulingIdDto,
      Either<EntityNotEmpty, ListPlaylistResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindSchedulingByIdRepository')
    private findSchedulingByIdRepository: FindSchedulingByIdRepository,
    @Inject('ListPlaylistBySchedulingIdRepository')
    private listPlaylistBySchedulingIdRepository: ListPlaylistBySchedulingIdRepository
  ) {}
  async execute(
    input: ListPlaylistBySchedulingIdDto
  ): Promise<Either<EntityNotEmpty, ListPlaylistResponseDto>> {
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

    const filteredPlaylistToScheduling =
      await this.listPlaylistBySchedulingIdRepository.list(input);

    return right(filteredPlaylistToScheduling);
  }
}
