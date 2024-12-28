import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { FindPlaylistByIdDto, PlaylistResponseDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationUserId } from '../../utils';

export class FindPlaylistById
  implements
    UseCase<
      FindPlaylistByIdDto,
      Either<EntityNotEmpty | EntityNotExists, PlaylistResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository
  ) {}
  async execute(
    input: FindPlaylistByIdDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, PlaylistResponseDto>> {
    const { id, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredPlaylist = await this.findPlaylistByIdRepository.find(id);

    if (Object.keys(filteredPlaylist?.id ?? filteredPlaylist).length < 1) {
      return left(new EntityNotExists('Playlist'));
    }

    return right(filteredPlaylist);
  }
}
