import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditPlaylistCategoryDto } from '../../../dto/request/playlist/category/edit-playlist-category.dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditPlaylistCategoryRepository,
  FindPlaylistCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationPlaylistCategoryId, ValidationUserId } from '../../../utils';

export class EditPlaylistCategory
  implements
    UseCase<
      EditPlaylistCategoryDto,
      Either<EntityNotEmpty | EntityNotExists, void>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistCategoryByIdRepository')
    private findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository,
    @Inject('EditPlaylistCategoryRepository')
    private editPlaylistCategoryRepository: EditPlaylistCategoryRepository
  ) {}
  async execute(
    input: EditPlaylistCategoryDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
    const { id, loggedUserId, body } = input;

    if (Object.keys(body.name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(body.description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

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

    await this.editPlaylistCategoryRepository.edit(input);

    return right(undefined);
  }
}
