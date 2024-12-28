import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { FindUserByEmailDto } from '../../dto';
import { LoggedUser } from '../../entity';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { FindUserByEmailRepository } from '../../repository';
import { Either, left, right } from '../../shared/either';

export class FindUserByEmail
  implements UseCase<FindUserByEmailDto, Either<EntityNotEmpty, LoggedUser>>
{
  constructor(
    @Inject('FindUserByEmailRepository')
    private findUserByEmailRepository: FindUserByEmailRepository
  ) {}

  async execute(
    input: FindUserByEmailDto
  ): Promise<Either<EntityNotEmpty, LoggedUser>> {
    const { email } = input;

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('email'));
    }

    const user = await this.findUserByEmailRepository.find(input);

    if (Object.keys(user).length < 1) {
      return left(new EntityNotExists('user'));
    }

    return right(user);
  }
}
