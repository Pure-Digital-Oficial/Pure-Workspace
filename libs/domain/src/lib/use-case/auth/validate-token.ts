import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ValidateTokenDto } from '../../dto';
import {
  EntityNotEmpty,
  EntityNotExists,
  EntityNotValid,
  InsufficientCharacters,
} from '../../error';
import {
  FindUserByIdRepository,
  ValidateTokenExpirationRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';

export class ValidateToken
  implements
    UseCase<
      ValidateTokenDto,
      Either<InsufficientCharacters | EntityNotExists, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ValidateTokenExpirationRepository')
    private validateTokenExpirationRepository: ValidateTokenExpirationRepository
  ) {}
  async execute(
    input: ValidateTokenDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, string>> {
    const { loggedUserId, token } = input;

    if (Object.keys(loggedUserId).length < 1) {
      return left(new EntityNotEmpty('User ID'));
    }

    if (Object.keys(token).length < 1) {
      return left(new EntityNotEmpty('Token'));
    }

    const filteredUser = await this.findUserByIdRepository.find(loggedUserId);

    if (Object.keys(filteredUser?.userId ?? filteredUser).length < 1) {
      return left(new EntityNotExists('User'));
    }

    const validateHash = await this.validateTokenExpirationRepository.validate(
      token
    );

    if (!validateHash) {
      return left(new EntityNotValid('token'));
    }

    return right(token);
  }
}
