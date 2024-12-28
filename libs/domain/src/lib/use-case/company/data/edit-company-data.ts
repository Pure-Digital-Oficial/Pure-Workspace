import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditCompanyDataDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditCompanyDataRepository,
  FindCompanyDataByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class EditCompanyData
  implements
    UseCase<
      EditCompanyDataDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotEdit, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyDataByIdRepository')
    private findCompanyDataByIdRepository: FindCompanyDataByIdRepository,
    @Inject('EditCompanyDataRepository')
    private editCompanyDataRepository: EditCompanyDataRepository
  ) {}
  async execute(
    input: EditCompanyDataDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists | EntityNotEdit, string>> {
    const {
      body: { legalNature, opening, phone, port, responsibleEmail, situation },
      companyDataId,
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

    if (Object.keys(port).length < 1) {
      return left(new EntityNotEmpty('Port'));
    }

    if (Object.keys(responsibleEmail).length < 1) {
      return left(new EntityNotEmpty('Responsible Email'));
    }

    if (Object.keys(situation).length < 1) {
      return left(new EntityNotEmpty('Situation'));
    }

    const formatedPhone = phone.replace(/[^\d]+/g, '');

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredCompanyData = await this.findCompanyDataByIdRepository.find(
      companyDataId
    );

    if (
      Object.keys(filteredCompanyData?.id ?? filteredCompanyData).length < 1
    ) {
      return left(new EntityNotExists('Company Data'));
    }

    const editedCompanyData = await this.editCompanyDataRepository.edit({
      ...input,
      body: {
        ...input.body,
        phone: formatedPhone,
      },
    });

    if (Object.keys(editedCompanyData).length < 1) {
      return left(new EntityNotEdit('Company Data'));
    }

    return right(editedCompanyData);
  }
}
