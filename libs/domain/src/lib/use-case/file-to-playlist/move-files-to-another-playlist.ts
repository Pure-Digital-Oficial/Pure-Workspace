import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { MoveFilesToAnotherPlaylistDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotAssociate,
  EntityNotEmpty,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  ValidationContentFileId,
  ValidationPlaylistId,
  ValidationUserId,
} from '../../utils';
import {
  FindContentFileByIdRepository,
  FindFileInFileToPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  MoveFileToAnotherPlaylistRepository,
} from '../../repository';

export class MoveFilesToAnotherPlaylist
  implements
    UseCase<
      MoveFilesToAnotherPlaylistDto,
      Either<EntityNotEmpty | EntityNotAssociate | EntityAlreadyExists, void>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository,
    @Inject('FindFileInFileToPlaylistRepository')
    private findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository,
    @Inject('MoveFileToAnotherPlaylistRepository')
    private MoveFileToAnotherPlaylistRepository: MoveFileToAnotherPlaylistRepository
  ) {}

  async execute(
    input: MoveFilesToAnotherPlaylistDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotAssociate | EntityAlreadyExists, void>
  > {
    const { filesId, loggedUserId, newPlaylistId, oldPlaylistId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const newPlaylitValidation = await ValidationPlaylistId(
      newPlaylistId,
      this.findPlaylistByIdRepository
    );

    if (newPlaylitValidation.isLeft()) {
      return left(newPlaylitValidation.value);
    }

    const oldPlaylitValidation = await ValidationPlaylistId(
      oldPlaylistId,
      this.findPlaylistByIdRepository
    );

    if (oldPlaylitValidation.isLeft()) {
      return left(oldPlaylitValidation.value);
    }

    for (const file of filesId) {
      const contentFileValidation = await ValidationContentFileId(
        file,
        this.findContentFileByIdRepository
      );

      if (contentFileValidation.isLeft()) {
        return left(contentFileValidation.value);
      }

      const filteredOldPlaylist =
        await this.findFileInFileToPlaylistRepository.find({
          fileId: file,
          playlsitId: oldPlaylistId,
        });

      if (Object.keys(filteredOldPlaylist).length < 1) {
        return left(new EntityNotAssociate(file, 'Playlist'));
      }

      const filterednewPlaylist =
        await this.findFileInFileToPlaylistRepository.find({
          fileId: file,
          playlsitId: newPlaylistId,
        });

      if (Object.keys(filterednewPlaylist).length > 0) {
        return left(new EntityAlreadyExists(file));
      }

      await this.MoveFileToAnotherPlaylistRepository.move({
        fileId: file,
        newPlaylistId,
        oldPlaylistId,
      });
    }

    return right(undefined);
  }
}
