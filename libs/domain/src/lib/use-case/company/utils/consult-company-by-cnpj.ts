import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CompanyResponseDto, ConsultCompanyByCnpjDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  ConsultCompanyByCnpjRepository,
  FindCompanyByCnpjRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyByCnpj, ValidationUserId } from '../../../utils';

export class ConsultCompanyByCnpj
  implements
    UseCase<
      ConsultCompanyByCnpjDto,
      Either<EntityNotEmpty, CompanyResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByCnpjRepository')
    private findCompanyByCnpjRepository: FindCompanyByCnpjRepository,
    @Inject('ConsultCompanyByCnpjRepository')
    private consultCompanyByCnpjRepository: ConsultCompanyByCnpjRepository
  ) {}
  async execute(
    input: ConsultCompanyByCnpjDto
  ): Promise<Either<EntityNotEmpty, CompanyResponseDto>> {
    const { cnpj, loggedUserId } = input;

    if (Object.keys(cnpj).length < 1) {
      return left(new EntityNotEmpty('CNPJ'));
    }
    const formatedcnpj = cnpj.replace(/[^\d]+/g, '');

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const companyValidation = await ValidationCompanyByCnpj(
      formatedcnpj,
      this.findCompanyByCnpjRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const consultedCompany = await this.consultCompanyByCnpjRepository.consult(
      formatedcnpj
    );

    if (
      Object.keys(consultedCompany?.simple?.cnpj ?? consultedCompany).length < 1
    ) {
      return left(new EntityNotExists('Company'));
    }
    return right(consultedCompany);
  }
}
