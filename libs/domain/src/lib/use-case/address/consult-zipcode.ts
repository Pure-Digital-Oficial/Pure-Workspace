import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ConsultZipcodeDto, SimpleAddressResponseDto } from '../../dto';
import { EntityNotEmpty, EntityNotFound } from '../../error';
import {
  ConsultZipcodeRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationUserId } from '../../utils';

export class ConsultZipcode
  implements
    UseCase<
      ConsultZipcodeDto,
      Either<EntityNotEmpty, SimpleAddressResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('ConsultZipcodeRepository')
    private consultZipcodeRepository: ConsultZipcodeRepository
  ) {}
  async execute(
    input: ConsultZipcodeDto
  ): Promise<Either<EntityNotEmpty, SimpleAddressResponseDto>> {
    const { loggedUserId, zipcode } = input;

    if (Object.keys(zipcode).length < 1) {
      return left(new EntityNotEmpty('Zipcode'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const consultedZipcode = await this.consultZipcodeRepository.consult(input);

    if (Object.keys(consultedZipcode?.zipcode ?? consultedZipcode).length < 1) {
      return left(new EntityNotFound('zipcode'));
    }

    return right(consultedZipcode);
  }
}
