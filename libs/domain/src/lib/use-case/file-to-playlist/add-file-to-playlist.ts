import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { AddFileToPlaylistDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  AddFileToPlaylistRepository,
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

export class AddFileToPlaylist
  implements UseCase<AddFileToPlaylistDto, Either<EntityNotEmpty, string[]>>
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
    @Inject('AddFileToPlaylistRepository')
    private addFileToPlaylistRepository: AddFileToPlaylistRepository
  ) {}
  async execute(
    input: AddFileToPlaylistDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { loggedUserId, filesId, playlistId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    for (const file of filesId) {
      const contentFileValidation = await ValidationContentFileId(
        file,
        this.findContentFileByIdRepository
      );

      if (contentFileValidation.isLeft()) {
        return left(contentFileValidation.value);
      }

      const filteredFile = await this.findFileInFileToPlaylistRepository.find({
        fileId: file,
        playlsitId: playlistId,
      });
      if (Object.keys(filteredFile).length > 0) {
        return left(new EntityAlreadyExists(file));
      }
    }

    const playlitValidation = await ValidationPlaylistId(
      playlistId,
      this.findPlaylistByIdRepository
    );

    if (playlitValidation.isLeft()) {
      return left(playlitValidation.value);
    }

    const createdResult = await this.addFileToPlaylistRepository.add(input);

    if (Object.keys(createdResult).length < 1) {
      return left(new EntityNotCreated('File to Playlist'));
    }

    return right(createdResult);
  }
}
