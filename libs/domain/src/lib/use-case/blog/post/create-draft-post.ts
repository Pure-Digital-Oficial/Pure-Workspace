import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreatePostDto } from '../../../dto';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreateDraftPostRepository,
  FindAppByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class CreateDraftPost
  implements UseCase<CreatePostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('CreateDraftPostRepository')
    private createDraftPostRepository: CreateDraftPostRepository
  ) {}
  async execute(input: CreatePostDto): Promise<Either<EntityNotEmpty, string>> {
    const {
      appId,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('App ID'));
    }

    if (Object.keys(input.body).length < 1) {
      return left(new EntityNotEmpty('Body'));
    }

    if (Object.keys(content).length < 1) {
      return left(new EntityNotEmpty('Content'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    if (Object.keys(subTitle).length < 1) {
      return left(new EntityNotEmpty('SubTitle'));
    }

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('Title'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app ID'));
    }

    const createdDraftPost = await this.createDraftPostRepository.create(input);

    if (Object.keys(createdDraftPost).length < 1) {
      return left(new EntityNotCreated('Post'));
    }

    return right(createdDraftPost);
  }
}
