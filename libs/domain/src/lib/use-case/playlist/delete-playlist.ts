import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeletePlaylistDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  DeleteFileByPlaylistRepository,
  DeletePlaylistRepoistory,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationPlaylistId, ValidationUserId } from '../../utils';

export class DeletePlaylist
  implements UseCase<DeletePlaylistDto, Either<EntityNotEmpty, void>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository,
    @Inject('DeleteFileByPlaylistRepository')
    private deleteFileByPlaylistRepository: DeleteFileByPlaylistRepository,
    @Inject('DeletePlaylistRepoistory')
    private deletePlaylistRepository: DeletePlaylistRepoistory
  ) {}
  async execute(
    input: DeletePlaylistDto
  ): Promise<Either<EntityNotEmpty, void>> {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const playlitValidation = await ValidationPlaylistId(
      id,
      this.findPlaylistByIdRepository
    );

    if (playlitValidation.isLeft()) {
      return left(playlitValidation.value);
    }

    await this.deleteFileByPlaylistRepository.delete(id);

    await this.deletePlaylistRepository.delete(id);

    return right(undefined);
  }
}
