import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import {
  FindFilesByPlaylistDto,
  FindFilesByPlaylistResponseDto,
} from '../../dto';
import { EntityNotEmpty } from '../../error';
import {
  FindFilesByPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationPlaylistId, ValidationUserId } from '../../utils';

export class FindFilesByPlaylist
  implements
    UseCase<
      FindFilesByPlaylistDto,
      Either<EntityNotEmpty, FindFilesByPlaylistResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository,
    @Inject('FindFilesByPlaylistRepository')
    private findFilesByPlaylistRepository: FindFilesByPlaylistRepository
  ) {}

  async execute(
    input: FindFilesByPlaylistDto
  ): Promise<Either<EntityNotEmpty, FindFilesByPlaylistResponseDto>> {
    const { idPlaylist, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const playlitValidation = await ValidationPlaylistId(
      idPlaylist,
      this.findPlaylistByIdRepository
    );

    if (playlitValidation.isLeft()) {
      return left(playlitValidation.value);
    }

    const resultedFiles = await this.findFilesByPlaylistRepository.find(input);

    return right(resultedFiles);
  }
}
