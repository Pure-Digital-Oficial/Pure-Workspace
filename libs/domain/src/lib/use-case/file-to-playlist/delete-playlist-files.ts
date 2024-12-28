import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeletePlaylistFilesDto } from '../../dto';
import { EntityNotAssociate, EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  DeletePlaylistFileRepository,
  FindContentFileByIdRepository,
  FindFileInFileToPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import {
  ValidationContentFileId,
  ValidationPlaylistId,
  ValidationUserId,
} from '../../utils';

export class DeletePlaylistFiles
  implements
    UseCase<
      DeletePlaylistFilesDto,
      Either<EntityNotEmpty | EntityNotAssociate, void>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository,
    @Inject('FindFileInFileToPlaylistRepository')
    private findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository,
    @Inject('DeletePlaylistFileRepository')
    private deletePlaylistFileRepository: DeletePlaylistFileRepository
  ) {}

  async execute(
    input: DeletePlaylistFilesDto
  ): Promise<Either<EntityNotEmpty | EntityNotAssociate, void>> {
    const { filesId, loggedUserId, playlistId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const playlitValidation = await ValidationPlaylistId(
      playlistId,
      this.findPlaylistByIdRepository
    );

    if (playlitValidation.isLeft()) {
      return left(playlitValidation.value);
    }

    for (const file of filesId) {
      const contentFileValidation = await ValidationContentFileId(
        file,
        this.findContentFileByIdRepository
      );

      if (contentFileValidation.isLeft()) {
        return left(contentFileValidation.value);
      }

      const filteredPlaylist =
        await this.findFileInFileToPlaylistRepository.find({
          fileId: file,
          playlsitId: playlistId,
        });

      if (Object.keys(filteredPlaylist).length < 1) {
        return left(new EntityNotAssociate(file, 'Playlist'));
      }

      await this.deletePlaylistFileRepository.delete({
        loggedUserId,
        playlistId,
        fileId: file,
      });
    }

    return right(undefined);
  }
}
