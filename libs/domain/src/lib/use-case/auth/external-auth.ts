import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ExternaleAuthDto } from '../../dto';
import { EntityNotCreated, EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  CreateUserRepository,
  FilterByEmailOrNicknameRepository,
  FindAppByIdRepository,
  SignInRepository,
} from '../../repository';
import { AccessToken } from '../../entity';

export class ExternalAuth
  implements
    UseCase<
      ExternaleAuthDto,
      Either<EntityNotEmpty | EntityNotExists, AccessToken>
    >
{
  constructor(
    @Inject('FindAppByNameRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('FilterByEmailOrNicknameRepository')
    private filterEmailRepository: FilterByEmailOrNicknameRepository,
    @Inject('CreateUserRepository')
    private createUserRepository: CreateUserRepository,
    @Inject('SignInRepository')
    private signInRepository: SignInRepository
  ) {}
  async execute(
    input: ExternaleAuthDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, AccessToken>> {
    const { appId, email, name } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('appId'));
    }

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('email'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app id'));
    }

    const filteredUserEmail = await this.filterEmailRepository.filter(email);

    let userId: string;

    if (Object.keys(filteredUserEmail).length < 1) {
      const createdUser = await this.createUserRepository.create({
        appId,
        name,
        nickname: name,
      });

      if (Object.keys(createdUser).length < 1) {
        return left(new EntityNotCreated('User'));
      }

      userId = createdUser;
    } else {
      userId = filteredUserEmail.userId;
    }

    const signInResult = await this.signInRepository.sign({
      email,
      userId,
    });

    return right(signInResult);
  }
}
