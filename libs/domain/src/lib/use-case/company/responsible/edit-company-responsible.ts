import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditCompanyResponsibleDto } from '../../../dto';
import { EntityNotEdit, EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditCompanyResponsibleRepository,
  FindCompanyResponsibleByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class EditCompanyResponsible
  implements UseCase<EditCompanyResponsibleDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyResponsibleByIdRepository')
    private findCompanyResponsibleByIdRepository: FindCompanyResponsibleByIdRepository,
    @Inject('EditCompanyResponsibleRepository')
    private editCompanyResponsibleRepository: EditCompanyResponsibleRepository
  ) {}

  async execute(
    input: EditCompanyResponsibleDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      body: { birthdate, email, name, phone },
      companyResponsibleId,
      loggedUserId,
    } = input;
    if (Object.keys(companyResponsibleId).length < 1) {
      return left(new EntityNotEmpty('Company Responsible ID'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(birthdate?.toString() ?? birthdate).length < 1) {
      return left(new EntityNotEmpty('Birth Date'));
    }

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('Email'));
    }

    if (Object.keys(phone).length < 1) {
      return left(new EntityNotEmpty('Phone'));
    }
    const formatedPhone = phone.replace(/[^\d]+/g, '');

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredCompanyResponsible =
      await this.findCompanyResponsibleByIdRepository.find(
        companyResponsibleId
      );

    if (
      Object.keys(filteredCompanyResponsible?.id ?? filteredCompanyResponsible)
        .length < 1
    ) {
      return left(new EntityNotExists('Company Responsible'));
    }

    const editedCompanyResponsible =
      await this.editCompanyResponsibleRepository.edit({
        companyResponsibleId,
        loggedUserId,
        body: {
          ...input.body,
          phone: formatedPhone,
        },
      });

    if (Object.keys(editedCompanyResponsible).length < 1) {
      return left(new EntityNotEdit('Company Responsible'));
    }

    return right(editedCompanyResponsible);
  }
}
