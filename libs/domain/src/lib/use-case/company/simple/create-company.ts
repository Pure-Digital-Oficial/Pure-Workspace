import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateCompanyDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotValid,
} from '../../../error';
import {
  ConsultCompanyByCnpjRepository,
  CreateCompanyRepository,
  FindCompanyByCnpjRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class CreateCompany
  implements UseCase<CreateCompanyDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByCnpjRepository')
    private findCompanyByCnpjRepository: FindCompanyByCnpjRepository,
    @Inject('ConsultCompanyByCnpjRepository')
    private consultCompanyByCnpjRepository: ConsultCompanyByCnpjRepository,
    @Inject('CreateCompanyRepository')
    private createCompanyRepository: CreateCompanyRepository
  ) {}
  async execute(
    input: CreateCompanyDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { cnpj, socialReason },
      loggedUserId,
    } = input;

    if (Object.keys(cnpj).length < 1) {
      return left(new EntityNotEmpty('CNPJ'));
    }

    const formatedcnpj = cnpj.replace(/[^\d]+/g, '');

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

    const filteredCompany = await this.findCompanyByCnpjRepository.find(
      formatedcnpj
    );

    if (Object.keys(filteredCompany?.id ?? filteredCompany).length > 0) {
      return left(new EntityAlreadyExists('Company'));
    }

    const consultCompany = await this.consultCompanyByCnpjRepository.consult(
      formatedcnpj
    );

    if (
      Object.keys(consultCompany?.simple?.cnpj ?? consultCompany).length < 1
    ) {
      return left(new EntityNotValid('Company'));
    }

    const createdCompany = await this.createCompanyRepository.create({
      body: {
        ...input.body,
        cnpj: formatedcnpj,
      },
      loggedUserId,
    });

    if (Object.keys(createdCompany).length < 1) {
      return left(new EntityNotCreated('Company'));
    }

    return right(createdCompany);
  }
}
