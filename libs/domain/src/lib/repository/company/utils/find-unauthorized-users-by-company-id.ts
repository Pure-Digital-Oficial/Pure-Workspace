import {
  FindUnauthorizedUsersByCompanyIdDto,
  UnauthorizedUsersByCompanyIdResponseDto,
} from '../../../dto';

export interface FindUnauthorizedUsersByCompanyIdRepository {
  find(
    input: FindUnauthorizedUsersByCompanyIdDto
  ): Promise<UnauthorizedUsersByCompanyIdResponseDto>;
}
