import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { UserList } from '../../entity';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { FindUserByIdRepository } from '../../repository';
import { Either, left, right } from '../../shared/either';
import { FindUserByIdDto } from '../../dto';
import { ValidationUserId } from '../../utils';

export class FindUserById
  implements
    UseCase<
      FindUserByIdDto,
      Either<EntityNotEmpty | EntityNotExists, UserList>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository
  ) {}
  async execute(
    input: FindUserByIdDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, UserList>> {
    const { id, loggedUserId } = input;
    const idString = 'id';
    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty(idString));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const userFiltered = await this.findUserByIdRepository.find(id);

    if (Object.keys(userFiltered).length < 1) {
      return left(new EntityNotExists(idString));
    }

    return right(userFiltered);
  }
}
