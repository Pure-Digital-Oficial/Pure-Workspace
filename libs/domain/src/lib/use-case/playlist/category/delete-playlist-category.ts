import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { DeletePlaylistCategoryDto } from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import {
  DeletePlaylistCategoryRepository,
  FindPlaylistCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationPlaylistCategoryId, ValidationUserId } from '../../../utils';

export class DeletePlaylistCategory
  implements UseCase<DeletePlaylistCategoryDto, Either<EntityNotEmpty, void>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistCategoryByIdRepository')
    private findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository,
    @Inject('DeletePlaylistCategoryRepository')
    private deletePlaylistRepository: DeletePlaylistCategoryRepository
  ) {}
  async execute(
    input: DeletePlaylistCategoryDto
  ): Promise<Either<EntityNotEmpty, void>> {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const playlistCategoryValidation = await ValidationPlaylistCategoryId(
      id,
      this.findPlaylistCategoryByIdRepository
    );

    if (playlistCategoryValidation.isLeft()) {
      return left(playlistCategoryValidation.value);
    }

    await this.deletePlaylistRepository.delete(id);

    return right(undefined);
  }
}
