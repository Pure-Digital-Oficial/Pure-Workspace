import { UseCase } from '../../base/use-case';
import { CreateUserDto } from '../../dto';
import {
  EntityNotCreated,
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityNotExists,
  InsufficientCharacters,
} from '../../error';
import { CreateUserRepository, FindAppByIdRepository } from '../../repository';
import { FilterByEmailOrNicknameRepository } from '../../repository/user/filter-by-email-or-nickname';
import { Either, left, right } from '../../shared/either';
import { Inject } from '@nestjs/common';

export class CreateUser
  implements
    UseCase<
      CreateUserDto,
      Either<
        | InsufficientCharacters
        | EntityAlreadyExists
        | EntityNotEmpty
        | EntityNotExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('CreateUserRepository')
    private createUserRepository: CreateUserRepository,
    @Inject('FilterByEmailOrNicknameRepository')
    private filterNicknameRepository: FilterByEmailOrNicknameRepository,
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository
  ) {}

  async execute(
    input: CreateUserDto
  ): Promise<
    Either<
      | InsufficientCharacters
      | EntityAlreadyExists
      | EntityNotEmpty
      | EntityNotExists
      | EntityNotCreated,
      string
    >
  > {
    const { name, nickname, appId } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('app id'));
    }

    if (Object.keys(name).length < 1 || name.length < 3) {
      return left(new InsufficientCharacters('name'));
    }
    if (Object.keys(nickname).length < 1 || nickname.length < 3) {
      return left(new InsufficientCharacters('nickName'));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app id'));
    }

    const filterResult = await this.filterNicknameRepository.filter(nickname);

    if (Object.keys(filterResult?.userId ?? filterResult).length > 0) {
      return left(new EntityAlreadyExists(nickname));
    }

    const fiterUser = await this.createUserRepository.create(input);

    if (Object.keys(fiterUser).length < 1) {
      return left(new EntityNotCreated('User'));
    }

    return right(fiterUser);
  }
}
