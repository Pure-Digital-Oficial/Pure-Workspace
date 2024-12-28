import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ListDeviceDto, ListDeviceResponseDto } from '../../dto';
import { EntityNotEmpty } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListDeviceRepository,
} from '../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../utils';

export class ListDevice
  implements
    UseCase<ListDeviceDto, Either<EntityNotEmpty, ListDeviceResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('ListDeviceRepository')
    private listDeviceRepository: ListDeviceRepository
  ) {}
  async execute(
    input: ListDeviceDto
  ): Promise<Either<EntityNotEmpty, ListDeviceResponseDto>> {
    const { loggedUserId, companyId } = input;

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

    const filteredDevices = await this.listDeviceRepository.list(input);

    return right(filteredDevices);
  }
}
