import { Inject } from '@nestjs/common';
import { UseCase } from '../../../../base/use-case';
import { DeleteMediaPostDto } from '../../../../dto';
import { EntityNotDeleted, EntityNotEmpty } from '../../../../error';
import {
  DeleteFileByNameRepository,
  DeleteMediaPostRepository,
  FindMediaPostByIdRepository,
  FindUserByIdRepository,
} from '../../../../repository';
import { Either, left, right } from '../../../../shared/either';
import { ValidationMediaPostId, ValidationUserId } from '../../../../utils';

export class DeleteMediaPost
  implements UseCase<DeleteMediaPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindMediaPostByIdRepository')
    private findMediaPostByIdRepository: FindMediaPostByIdRepository,
    @Inject('DeleteMediaPostRepository')
    private deleteMediaPostRepository: DeleteMediaPostRepository,
    @Inject('DeleteFileByNameRepository')
    private deleteFileByNameRepository: DeleteFileByNameRepository
  ) {}
  async execute(
    input: DeleteMediaPostDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { loggedUserId, mediaId } = input;

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

    const filteredMediaPost = await this.findMediaPostByIdRepository.find(
      mediaId
    );

    const deletedMediaPost = await this.deleteMediaPostRepository.delete(input);

    if (Object.keys(deletedMediaPost).length < 1) {
      return left(new EntityNotDeleted('Media Post'));
    }

    if (Object.keys(filteredMediaPost?.thumbnail ?? '').length > 0) {
      const thumbnail = filteredMediaPost?.thumbnail
        ? filteredMediaPost?.thumbnail.split('/')
        : '';
      await this.deleteFileByNameRepository.delete(
        thumbnail[thumbnail.length - 1]
      );
      await this.deleteFileByNameRepository.delete(filteredMediaPost.content);
    } else {
      await this.deleteFileByNameRepository.delete(filteredMediaPost.content);
    }

    return right(deletedMediaPost);
  }
}
