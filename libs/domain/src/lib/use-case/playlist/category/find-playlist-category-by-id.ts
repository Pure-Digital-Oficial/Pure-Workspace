import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { FindPlaylistCategoryByIdDto } from '../../../dto';
import { PlaylistCategory } from '../../../entity';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import {
  FindPlaylistCategoryByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class FindPlaylistCategoryById
  implements
    UseCase<
      FindPlaylistCategoryByIdDto,
      Either<EntityNotEmpty, PlaylistCategory>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPlaylistCategoryByIdRepository')
    private findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository
  ) {}
  async execute(
    input: FindPlaylistCategoryByIdDto
  ): Promise<Either<EntityNotEmpty, PlaylistCategory>> {
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

    const filteredPlaylistCategory =
      await this.findPlaylistCategoryByIdRepository.find(id);

    if (
      Object.keys(filteredPlaylistCategory?.id ?? filteredPlaylistCategory)
        .length < 1
    ) {
      return left(new EntityNotExists('Category'));
    }

    return right(filteredPlaylistCategory);
  }
}
