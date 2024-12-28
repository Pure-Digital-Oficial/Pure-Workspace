import {
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdResponseDto,
} from '../../../dto';

export interface ListUsersByCompanyIdRepository {
  list(
    input: ListUsersByCompanyIdDto
  ): Promise<ListUsersByCompanyIdResponseDto>;
}
