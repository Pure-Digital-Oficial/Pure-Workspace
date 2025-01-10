import { Inject } from '@nestjs/common';
import { UseCase } from '../../../../base/use-case';
import { EditMediaPostDto } from '../../../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../../error';
import { Either, left, right } from '../../../../shared/either';
import {
  EditMediaPostRepository,
  FindMediaPostByIdRepository,
  FindUserByIdRepository,
} from '../../../../repository';
import { ValidationMediaPostId, ValidationUserId } from '../../../../utils';

export class EditMediaPost
  implements UseCase<EditMediaPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindMediaPostByIdRepository')
    private findMediaPostByIdRepository: FindMediaPostByIdRepository,
    @Inject('EditMediaPostRepository')
    private editMediaPostRepository: EditMediaPostRepository
  ) {}
  async execute(
    input: EditMediaPostDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { loggedUserId, mediaId, name } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const mediaPostValidation = await ValidationMediaPostId(
      mediaId,
      this.findMediaPostByIdRepository
    );

    if (mediaPostValidation.isLeft()) {
      return left(mediaPostValidation.value);
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    const editedMedia = await this.editMediaPostRepository.edit(input);

    if (Object.keys(editedMedia).length < 1) {
      return left(new EntityNotEdit('Media'));
    }

    return right(editedMedia);
  }
}
