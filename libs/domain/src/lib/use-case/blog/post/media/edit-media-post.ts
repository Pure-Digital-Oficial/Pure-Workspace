import { Inject } from '@nestjs/common';
import { UseCase } from '../../../../base/use-case';
import { EditMediaPostDto } from '../../../../dto';
import {
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../../error';
import { Either, left, right } from '../../../../shared/either';
import {
  EditMediaPostRepository,
  FindMediaByIdRepository,
  FindUserByIdRepository,
} from '../../../../repository';
import { ValidationUserId } from '../../../../utils';

export class EditMediaPost
  implements UseCase<EditMediaPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindMediaByIdRepository')
    private findMediaByIdRepository: FindMediaByIdRepository,
    @Inject('EditMediaPostRepository')
    private editMediaRepository: EditMediaPostRepository
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

    const findedMedia = await this.findMediaByIdRepository.find(mediaId);

    if (Object.keys(findedMedia?.id ?? findedMedia).length < 1) {
      return left(new EntityNotExists('Media'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    const editedMedia = await this.editMediaRepository.edit(input);

    if (Object.keys(editedMedia).length < 1) {
      return left(new EntityNotEdit('Media'));
    }

    return right(editedMedia);
  }
}
