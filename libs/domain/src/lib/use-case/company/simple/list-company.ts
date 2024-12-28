import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListCompanyDto, ListCompanyResponseDto } from '../../../dto';
import { EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindUserByIdRepository,
  ListCompanyRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class ListCompany
  implements
    UseCase<ListCompanyDto, Either<EntityNotEmpty, ListCompanyResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ListCompanyRepository')
    private listCompanyRepository: ListCompanyRepository
  ) {}
  async execute(
    input: ListCompanyDto
  ): Promise<Either<EntityNotEmpty, ListCompanyResponseDto>> {
    const { loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const listCompany = await this.listCompanyRepository.list(input);

    return right(listCompany);
  }
}
