import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateCompanyResponsibleDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  CreateCompanyResponsibleRespository,
  FindCompanyResponsibleByDocumentRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class CreateCompanyResponsible
  implements
    UseCase<
      CreateCompanyResponsibleDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotCreated, string>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindCompanyResponsibleByDocumentRepository')
    private findCompanyResponsibleByDocumentRepository: FindCompanyResponsibleByDocumentRepository,
    @Inject('CreateCompanyResponsibleRespository')
    private createCompanyResponsibleRepository: CreateCompanyResponsibleRespository
  ) {}

  async execute(
    input: CreateCompanyResponsibleDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotCreated, string>
  > {
    const {
      companyId,
      loggedUserId,
      body: { name, birthdate, document, email, phone },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(birthdate?.toString() ?? birthdate).length < 1) {
      return left(new EntityNotEmpty('Birth Date'));
    }

    if (Object.keys(document).length < 1) {
      return left(new EntityNotEmpty('Document'));
    }

    if (Object.keys(email).length < 1) {
      return left(new EntityNotEmpty('Email'));
    }

    if (Object.keys(phone).length < 1) {
      return left(new EntityNotEmpty('Phone'));
    }
    const formatedPhone = phone.replace(/[^\d]+/g, '');
    const formatedDocument = document.replace(/[^\d]+/g, '');

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

    const filteredCompanyResponsible =
      await this.findCompanyResponsibleByDocumentRepository.find(document);

    if (
      Object.keys(filteredCompanyResponsible?.id ?? filteredCompanyResponsible)
        .length > 0
    ) {
      return left(new EntityAlreadyExists('Company Responsible'));
    }

    const createdCompanyResponsible =
      await this.createCompanyResponsibleRepository.create({
        body: {
          birthdate,
          document: formatedDocument,
          phone: formatedPhone,
          email,
          name,
        },
        companyId,
        loggedUserId,
      });

    if (Object.keys(createdCompanyResponsible).length < 1) {
      return left(new EntityNotCreated('Company Responsible'));
    }

    return right(createdCompanyResponsible);
  }
}
