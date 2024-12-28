import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { DeleteCompanyByIdDto } from '../../../dto';
import { EntityNotDeleted, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  DeleteCompanyByIdRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class DeleteCompanyById
  implements UseCase<DeleteCompanyByIdDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('DeleteCompanyByIdRepository')
    private deleteCompanyByIdRepository: DeleteCompanyByIdRepository
  ) {}
  async execute(
    input: DeleteCompanyByIdDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { companyId, loggedUserId, description } = input;

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

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

    const deleteCompany = await this.deleteCompanyByIdRepository.delete(input);

    if (Object.keys(deleteCompany).length < 1) {
      return left(new EntityNotDeleted('Company'));
    }

    return right(deleteCompany);
  }
}
