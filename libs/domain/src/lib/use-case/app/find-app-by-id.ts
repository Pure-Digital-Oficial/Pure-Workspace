import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { FindAppByIdDto } from '../../dto';
import { App } from '../../entity';
import { EntityNotExists, InsufficientCharacters } from '../../error';
import { FindAppByIdRepository } from '../../repository';
import { Either, left, right } from '../../shared/either';

export class FindAppById
  implements
    UseCase<
      FindAppByIdDto,
      Either<InsufficientCharacters | EntityNotExists, App>
    >
{
  constructor(
    @Inject('FindAppByNameRepository')
    private findAppByIdRepository: FindAppByIdRepository
  ) {}
  async execute(
    input: FindAppByIdDto
  ): Promise<Either<InsufficientCharacters | EntityNotExists, App>> {
    const { id } = input;

    if (Object.keys(id).length < 1) {
      return left(new InsufficientCharacters('id'));
    }

    const findedApp = await this.findAppByIdRepository.find(id);

    if (Object.keys(findedApp).length < 1) {
      return left(new EntityNotExists(id));
    }

    return right(findedApp);
  }
}
