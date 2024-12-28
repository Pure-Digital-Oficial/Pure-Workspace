import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import {
  ListSimpleDirectoryDto,
  ListSimpleDirectoryResponseDto,
} from '../../dto';
import { EntityNotEmpty } from '../../error';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListSimpleDirectoryRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationCompanyId, ValidationUserId } from '../../utils';

export class ListSimpleDirectory
  implements
    UseCase<
      ListSimpleDirectoryDto,
      Either<EntityNotEmpty, ListSimpleDirectoryResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('ListSimpleDirectoryRepository')
    private listSimpleDirectoryRepository: ListSimpleDirectoryRepository
  ) {}
  async execute(
    input: ListSimpleDirectoryDto
  ): Promise<Either<EntityNotEmpty, ListSimpleDirectoryResponseDto>> {
    const { loggedUserId, companyId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );
    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }
    const filteredDirectories = await this.listSimpleDirectoryRepository.list(
      input
    );

    return right(filteredDirectories);
  }
}
