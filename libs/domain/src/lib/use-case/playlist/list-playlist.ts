import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { ListPlaylistDto, ListPlaylistResponseDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListPlaylistRepository,
} from '../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../utils';

export class ListPlaylist
  implements
    UseCase<
      ListPlaylistDto,
      Either<EntityNotEmpty | EntityNotExists, ListPlaylistResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('ListPlaylistRepository')
    private listPlaylistRepository: ListPlaylistRepository
  ) {}
  async execute(
    input: ListPlaylistDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, ListPlaylistResponseDto>
  > {
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

    const filteredPlaylist = await this.listPlaylistRepository.list(input);

    return right(filteredPlaylist);
  }
}
