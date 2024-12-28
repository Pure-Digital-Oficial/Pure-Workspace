import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ListContentFileDto, ListContentFileResponseDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import {
  FindCompanyByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  ListContentFileRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import {
  ValidationCompanyId,
  ValidationDirectoryId,
  ValidationUserId,
} from '../../utils';

export class ListContentFile
  implements
    UseCase<
      ListContentFileDto,
      Either<EntityNotEmpty | EntityNotExists, ListContentFileResponseDto>
    >
{
  constructor(
    @Inject('ListContentFileRepository')
    private listContentFileRepository: ListContentFileRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository
  ) {}

  async execute(
    input: ListContentFileDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, ListContentFileResponseDto>
  > {
    const { directoryId, loggedUserId, companyId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const directoryValidation = await ValidationDirectoryId(
      directoryId,
      this.findDirectoryByIdRepository
    );

    if (directoryValidation.isLeft()) {
      return left(directoryValidation.value);
    }

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const resultList = await this.listContentFileRepository.list(input);

    return right(resultList);
  }
}
