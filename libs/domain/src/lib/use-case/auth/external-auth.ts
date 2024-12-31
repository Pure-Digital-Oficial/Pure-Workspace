import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ExternalAuthDto } from '../../dto';
import { EntityNotCreated, EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  CreateAuthRepository,
  CreateUserRepository,
  FilterByEmailOrNicknameRepository,
  FindAppByIdRepository,
  HashGeneratorRepository,
  SignInRepository,
} from '../../repository';
import { AccessToken } from '../../entity';

export class ExternalAuth
  implements
    UseCase<
      ExternalAuthDto,
      Either<EntityNotEmpty | EntityNotExists, AccessToken>
    >
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('FilterByEmailOrNicknameRepository')
    private filterEmailRepository: FilterByEmailOrNicknameRepository,
    @Inject('CreateUserRepository')
    private createUserRepository: CreateUserRepository,
    @Inject('HashGeneratorRepository')
    private hashGeneratorRepository: HashGeneratorRepository,
    @Inject('CreateAuthRepository')
    private createAuthRepository: CreateAuthRepository,
    @Inject('SignInRepository')
    private signInRepository: SignInRepository
  ) {}
  async execute(
    input: ExternalAuthDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, AccessToken>> {
    const {
      appId,
      externalId,
      body: { email, name },
    } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('app ID'));
    }

    if (Object.keys(externalId).length < 1) {
      return left(new EntityNotEmpty('external ID'));
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
      return left(new EntityNotExists('app ID'));
    }

    const filteredUserEmail = await this.filterEmailRepository.filter(email);

    let userId: string;

    if (Object.keys(filteredUserEmail.userId ?? filteredUserEmail).length < 1) {
      const createdUser = await this.createUserRepository.create({
        appId,
        name,
        nickname: name,
      });

      if (Object.keys(createdUser).length < 1) {
        return left(new EntityNotCreated('User'));
      }

      const hashedPassword = await this.hashGeneratorRepository.hash(
        externalId
      );

      await this.createAuthRepository.create({
        email,
        userId: createdUser,
        password: hashedPassword,
      });

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
