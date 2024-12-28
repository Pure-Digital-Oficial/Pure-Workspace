import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditCompanyDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditCompanyRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class EditCompany
  implements UseCase<EditCompanyDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('EditCompanyRepository')
    private editCompanyRepository: EditCompanyRepository
  ) {}
  async execute(
    input: EditCompanyDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { cnpj, socialReason },
      companyId,
      loggedUserId,
    } = input;

    if (Object.keys(cnpj).length < 1) {
      return left(new EntityNotEmpty('CNPJ'));
    }

    if (Object.keys(socialReason).length < 1) {
      return left(new EntityNotEmpty('Social Reason'));
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

    const editedCompany = await this.editCompanyRepository.edit(input);

    if (Object.keys(editedCompany).length < 1) {
      return left(new EntityNotEdit('Company'));
    }

    return right(editedCompany);
  }
}
