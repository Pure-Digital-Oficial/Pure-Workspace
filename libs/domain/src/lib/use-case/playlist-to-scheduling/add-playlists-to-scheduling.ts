import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { AddPlaylistsToSchedulingDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  AddPlaylistToSchedulingRepository,
  FindPlaylistByIdRepository,
  FindPlaylistToSchedulingByIdsRepository,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import {
  ValidationPlaylistId,
  ValidationSchedulingId,
  ValidationUserId,
} from '../../utils';

export class AddPlaylistsToScheduling
  implements
    UseCase<AddPlaylistsToSchedulingDto, Either<EntityNotEmpty, string[]>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindSchedulingByIdRepository')
    private findSchedulingByIdRepository: FindSchedulingByIdRepository,
    @Inject('FindPlaylistByIdRepository')
    private findPlaylistByIdRepository: FindPlaylistByIdRepository,
    @Inject('FindPlaylistToSchedulingByIdsRepository')
    private findPlaylistToSchedulingByIdsRepository: FindPlaylistToSchedulingByIdsRepository,
    @Inject('AddPlaylistToSchedulingRepository')
    private addPlaylistToSchedulingRepository: AddPlaylistToSchedulingRepository
  ) {}

  async execute(
    input: AddPlaylistsToSchedulingDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { loggedUserId, playlistIds, schedulingId } = input;

    if (playlistIds.length < 1) {
      return left(new EntityNotEmpty('Playlist ID'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const schedulingValidation = await ValidationSchedulingId(
      schedulingId,
      this.findSchedulingByIdRepository
    );

    if (schedulingValidation.isLeft()) {
      return left(schedulingValidation.value);
    }

    const playlistToSchedulingList = [];

    for (const playlistId of playlistIds) {
      const playlitValidation = await ValidationPlaylistId(
        playlistId,
        this.findPlaylistByIdRepository
      );

      if (playlitValidation.isLeft()) {
        return left(playlitValidation.value);
      }

      const filteredPlaylistToScheduling =
        await this.findPlaylistToSchedulingByIdsRepository.find({
          playlistId,
          schedulingId,
        });

      if (Object.keys(filteredPlaylistToScheduling).length > 0) {
        return left(new EntityAlreadyExists('Playlist to Scheduling'));
      }

      const createdPlaylistScheduling =
        await this.addPlaylistToSchedulingRepository.add({
          schedulingId,
          playlistId,
        });

      if (Object.keys(createdPlaylistScheduling).length < 1) {
        return left(new EntityNotCreated('Playlist to Scheduling'));
      }

      playlistToSchedulingList.push(createdPlaylistScheduling);
    }

    return right(playlistToSchedulingList);
  }
}
