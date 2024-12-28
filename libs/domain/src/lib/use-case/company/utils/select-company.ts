import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { SelectCompanyDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityNotSelected,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  SelectCompanyRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class SelectCompany
  implements UseCase<SelectCompanyDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindUserIdByCompanyIdRepository')
    private findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository,
    @Inject('SelectCompanyRepository')
    private selectCompanyRepository: SelectCompanyRepository
  ) {}

  async execute(
    input: SelectCompanyDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { companyId, loggedUserId } = input;

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

    const userAndCompanyFiltered =
      await this.findUserIdByCompanyIdRepository.find({
        companyId,
        userId: loggedUserId,
      });

    if (Object.keys(userAndCompanyFiltered).length > 0) {
      return left(new EntityAlreadyExists('User in Company'));
    }

    const selectedCompany = await this.selectCompanyRepository.select(input);

    if (Object.keys(selectedCompany).length < 1) {
      return left(new EntityNotSelected('Company'));
    }

    return right(selectedCompany);
  }
}
