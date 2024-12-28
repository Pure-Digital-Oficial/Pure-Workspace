import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateCompanyDataDto } from '../../../dto';
import { EntityNotCreated, EntityNotEmpty } from '../../../error';
import {
  CreateCompanyDataRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class CreateCompanyData
  implements UseCase<CreateCompanyDataDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('CreateCompanyDataRepository')
    private createCompanyDataRepository: CreateCompanyDataRepository
  ) {}
  async execute(
    input: CreateCompanyDataDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { legalNature, opening, phone, port, situation, responsibleEmail },
      companyId,
      loggedUserId,
    } = input;

    if (Object.keys(legalNature).length < 1) {
      return left(new EntityNotEmpty('Legal Nature'));
    }

    if (Object.keys(opening).length < 1) {
      return left(new EntityNotEmpty('Opening'));
    }

    if (Object.keys(phone).length < 1) {
      return left(new EntityNotEmpty('Phone'));
    }
    const formatedPhone = phone.replace(/[^\d]+/g, '');

    if (Object.keys(port).length < 1) {
      return left(new EntityNotEmpty('Port'));
    }

    if (Object.keys(situation).length < 1) {
      return left(new EntityNotEmpty('Situation'));
    }

    if (Object.keys(responsibleEmail).length < 1) {
      return left(new EntityNotEmpty('Responsible Email'));
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

    const createdCompanyData = await this.createCompanyDataRepository.create({
      body: {
        legalNature,
        opening,
        phone: formatedPhone,
        port,
        situation,
        responsibleEmail,
      },
      companyId,
      loggedUserId,
    });

    if (Object.keys(createdCompanyData).length < 1) {
      return left(new EntityNotCreated('Company'));
    }

    return right(createdCompanyData);
  }
}
